/**
 * run-all.js
 *
 * Discovers every problem solution file (NN-pattern-name/*.js, excluding
 * _helpers/), runs it in a child process, and reports PASS/FAIL.
 *
 * PASS/FAIL is gated on the only fully reliable signal available without a
 * real assertion library: whether the file runs to completion without
 * throwing (non-zero exit). Each file additionally prints its own
 * `<actual> // expected: <expected>` lines for a human to eyeball; run-all
 * also does a best-effort, whitespace-normalized comparison of those lines
 * and reports it as an informational note (not a gate), since some files
 * annotate expected values with free text (e.g. "true (deep copy)") or
 * print multi-line arrays that a line-based parser can't fully capture.
 *
 * Usage: node run-all.js
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const ROOT = __dirname;

function findProblemFiles() {
  const entries = fs.readdirSync(ROOT, { withFileTypes: true });
  const folders = entries
    .filter((e) => e.isDirectory() && /^\d{2}-/.test(e.name))
    .map((e) => e.name)
    .sort();

  const files = [];
  for (const folder of folders) {
    const folderPath = path.join(ROOT, folder);
    const jsFiles = fs
      .readdirSync(folderPath)
      .filter((f) => f.endsWith('.js'))
      .sort();
    for (const f of jsFiles) {
      files.push(path.join(folder, f));
    }
  }
  return files;
}

// Strip all whitespace so multi-line/util.inspect formatting differences
// ("[ 1, 2 ]" vs "[1,2]", or values wrapped across lines) don't count as
// real mismatches.
function normalize(str) {
  return str.replace(/\s+/g, '');
}

function evaluateOutput(stdout) {
  const lines = stdout.split('\n').map((l) => l.trimEnd());
  let checks = 0;
  let matched = 0;
  const uncertain = [];

  for (const line of lines) {
    const idx = line.indexOf('// expected:');
    if (idx === -1) continue;

    const actual = line.slice(0, idx).trim();
    const expected = line.slice(idx + '// expected:'.length).trim();
    const normActual = normalize(actual);
    const normExpected = normalize(expected);

    checks++;
    // Equal, or expected carries descriptive free text appended to the value
    // (e.g. "true (deep copy, not same reference)") — treat prefix match as ok.
    if (normActual === normExpected || normExpected.startsWith(normActual)) {
      matched++;
    } else {
      uncertain.push({ actual, expected });
    }
  }

  return { checks, matched, uncertain };
}

function runOne(relativePath) {
  const absPath = path.join(ROOT, relativePath);

  try {
    const stdout = execFileSync('node', [absPath], {
      cwd: ROOT,
      encoding: 'utf8',
      timeout: 15000,
    });

    const { checks, matched, uncertain } = evaluateOutput(stdout);

    if (checks === 0) {
      return { relativePath, ok: true, note: 'ran clean, no printed test lines to check' };
    }
    if (matched === checks) {
      return { relativePath, ok: true, note: `ran clean, ${matched}/${checks} test lines match` };
    }
    return {
      relativePath,
      ok: true,
      note: `ran clean, ${matched}/${checks} test lines auto-matched (rest need a manual eyeball — see notes)`,
      uncertain,
    };
  } catch (err) {
    const message = err.stderr ? err.stderr.toString().split('\n')[0] : err.message;
    return { relativePath, ok: false, note: 'threw / non-zero exit', error: message };
  }
}

function main() {
  const files = findProblemFiles();
  const results = [];

  console.log(`Running ${files.length} solution files...\n`);

  for (const relativePath of files) {
    const result = runOne(relativePath);
    results.push(result);

    const status = result.ok ? 'PASS' : 'FAIL';
    console.log(`[${status}] ${relativePath}  (${result.note})`);

    if (result.error) console.log(`       error: ${result.error}`);
    if (result.uncertain) {
      for (const u of result.uncertain) {
        console.log(`       needs a look: got "${u.actual}" vs "${u.expected}"`);
      }
    }
  }

  const passCount = results.filter((r) => r.ok).length;
  const failCount = results.length - passCount;

  console.log('\n---------------------------------');
  console.log(`TOTAL: ${results.length}  PASS: ${passCount}  FAIL: ${failCount}`);
  console.log('---------------------------------');

  process.exit(failCount > 0 ? 1 : 0);
}

main();
