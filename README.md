# DSA Study Repository (JavaScript)

A personal Data Structures & Algorithms practice repo — **166 problems**, one solution per file, organized by pattern rather than by source or difficulty. Written in plain Node.js (CommonJS), no external dependencies.

Each solution file is self-contained and runnable on its own:

```bash
node 01-two-pointers/two-sum-ii-sorted.js
# or, via the npm script:
npm run solve -- 01-two-pointers/two-sum-ii-sorted.js
```

Run the entire suite at once:

```bash
npm run run-all
# or: node run-all.js
```

## File format

Every problem file follows the same template:

- A header comment block: problem name, difficulty, pattern, time/space complexity, and a one-line note on where this pattern shows up in real backend systems.
- A clean, idiomatic solution function (or class, for design problems).
- A handful of `console.log` test cases printed alongside their expected values.
- A **SENIOR NOTES** section: what breaks at 1B+ elements, how the approach changes in a distributed system, and a real-world backend analog.

## Shared helpers

A few problems need data structures JavaScript doesn't ship with. These live in [`_helpers/`](_helpers/) and are `require`'d by the files that need them:

| Helper | Exports | Used by |
|---|---|---|
| [`_helpers/heap.js`](_helpers/heap.js) | `Heap`, `MinHeap`, `MaxHeap` (comparator-based binary heap) | heaps, meeting-rooms-ii, Dijkstra problems, design-twitter-feed |
| [`_helpers/linked-list.js`](_helpers/linked-list.js) | `ListNode`, `arrayToList`, `listToArray` | merge-k-sorted-lists |
| [`_helpers/tree.js`](_helpers/tree.js) | `TreeNode`, `arrayToTree`, `treeToArray` | all of `15-trees/`, two-sum-iv-bst |

## Patterns

<!-- TOC -->
- [01-two-pointers — Two Pointers](#01-two-pointers)
- [02-sliding-window — Sliding Window](#02-sliding-window)
- [03-prefix-sum — Prefix Sum](#03-prefix-sum)
- [04-subarrays-kadane — Subarrays & Kadane's Algorithm](#04-subarrays-kadane)
- [05-intervals — Intervals](#05-intervals)
- [06-matrix — Matrix](#06-matrix)
- [07-strings-advanced — Strings Advanced](#07-strings-advanced)
- [08-hashmap-two-sum-family — Hashmap Two Sum Family](#08-hashmap-two-sum-family)
- [09-hashmap-frequency — Hashmap Frequency](#09-hashmap-frequency)
- [10-hashmap-dedup-sets — Hashmap Dedup Sets](#10-hashmap-dedup-sets)
- [11-hashmap-grouping — Hashmap Grouping](#11-hashmap-grouping)
- [12-design-cache — Design Cache](#12-design-cache)
- [13-binary-search — Binary Search](#13-binary-search)
- [14-heaps — Heaps](#14-heaps)
- [15-trees — Trees](#15-trees)
- [16-tries — Tries](#16-tries)
- [17-graphs-bfs-dfs — Graphs (BFS/DFS)](#17-graphs-bfs-dfs)
- [18-graphs-union-find — Graphs (Union-Find)](#18-graphs-union-find)
- [19-graphs-dijkstra — Graphs (Dijkstra)](#19-graphs-dijkstra)
- [20-randomized — Randomized](#20-randomized)
- [21-bit-manipulation — Bit Manipulation](#21-bit-manipulation)
- [22-backtracking — Backtracking](#22-backtracking)
- [23-dynamic-programming — Dynamic Programming](#23-dynamic-programming)
<!-- /TOC -->

## 01-two-pointers — Two Pointers

| Problem | Difficulty | File |
|---|---|---|
| Container With Most Water | Medium | [container-with-most-water.js](01-two-pointers/container-with-most-water.js) |
| Merge Sorted Array (in-place) | Easy | [merge-sorted-array-inplace.js](01-two-pointers/merge-sorted-array-inplace.js) |
| Move Zeroes | Easy | [move-zeroes.js](01-two-pointers/move-zeroes.js) |
| Remove Duplicates from Sorted Array | Easy | [remove-duplicates-sorted-array.js](01-two-pointers/remove-duplicates-sorted-array.js) |
| Sort Colors (Dutch National Flag) | Medium | [sort-colors.js](01-two-pointers/sort-colors.js) |
| Squares of a Sorted Array | Easy | [squares-of-sorted-array.js](01-two-pointers/squares-of-sorted-array.js) |
| 3Sum | Medium | [three-sum.js](01-two-pointers/three-sum.js) |
| Trapping Rain Water | Hard | [trapping-rain-water.js](01-two-pointers/trapping-rain-water.js) |
| Two Sum II - Input Array Is Sorted | Easy | [two-sum-ii-sorted.js](01-two-pointers/two-sum-ii-sorted.js) |
| Valid Palindrome | Easy | [valid-palindrome.js](01-two-pointers/valid-palindrome.js) |

## 02-sliding-window — Sliding Window

| Problem | Difficulty | File |
|---|---|---|
| Find All Anagrams in a String | Medium | [find-all-anagrams.js](02-sliding-window/find-all-anagrams.js) |
| Fruit Into Baskets | Medium | [fruit-into-baskets.js](02-sliding-window/fruit-into-baskets.js) |
| Longest Repeating Character Replacement | Medium | [longest-repeating-char-replacement.js](02-sliding-window/longest-repeating-char-replacement.js) |
| Longest Substring Without Repeating Characters | Medium | [longest-substring-no-repeat.js](02-sliding-window/longest-substring-no-repeat.js) |
| Maximum Sum Subarray of Size K | Easy | [max-sum-subarray-size-k.js](02-sliding-window/max-sum-subarray-size-k.js) |
| Minimum Size Subarray Sum | Medium | [minimum-size-subarray-sum.js](02-sliding-window/minimum-size-subarray-sum.js) |
| Minimum Window Substring | Hard | [minimum-window-substring.js](02-sliding-window/minimum-window-substring.js) |
| Permutation in String | Medium | [permutation-in-string.js](02-sliding-window/permutation-in-string.js) |
| Sliding Window Maximum | Hard | [sliding-window-maximum.js](02-sliding-window/sliding-window-maximum.js) |
| Subarrays with K Different Integers | Hard | [subarrays-with-k-distinct.js](02-sliding-window/subarrays-with-k-distinct.js) |

## 03-prefix-sum — Prefix Sum

| Problem | Difficulty | File |
|---|---|---|
| Car Pooling | Medium | [car-pooling.js](03-prefix-sum/car-pooling.js) |
| Contiguous Array | Medium | [contiguous-array.js](03-prefix-sum/contiguous-array.js) |
| Continuous Subarray Sum | Medium | [continuous-subarray-sum.js](03-prefix-sum/continuous-subarray-sum.js) |
| Corporate Flight Bookings | Medium | [corporate-flight-bookings.js](03-prefix-sum/corporate-flight-bookings.js) |
| Product of Array Except Self | Medium | [product-of-array-except-self.js](03-prefix-sum/product-of-array-except-self.js) |
| Range Addition | Medium | [range-addition.js](03-prefix-sum/range-addition.js) |
| Range Sum Query - Immutable | Easy | [range-sum-query-immutable.js](03-prefix-sum/range-sum-query-immutable.js) |
| Subarray Sum Equals K | Medium | [subarray-sum-equals-k.js](03-prefix-sum/subarray-sum-equals-k.js) |

## 04-subarrays-kadane — Subarrays & Kadane's Algorithm

| Problem | Difficulty | File |
|---|---|---|
| Count Subarrays With Given XOR | Medium | [count-subarrays-with-xor.js](04-subarrays-kadane/count-subarrays-with-xor.js) |
| Maximum Sum Circular Subarray | Medium | [maximum-circular-subarray.js](04-subarrays-kadane/maximum-circular-subarray.js) |
| Maximum Product Subarray | Medium | [maximum-product-subarray.js](04-subarrays-kadane/maximum-product-subarray.js) |
| Maximum Subarray | Easy | [maximum-subarray.js](04-subarrays-kadane/maximum-subarray.js) |
| Subarray Sums Divisible by K | Medium | [subarray-sums-divisible-by-k.js](04-subarrays-kadane/subarray-sums-divisible-by-k.js) |

## 05-intervals — Intervals

| Problem | Difficulty | File |
|---|---|---|
| Insert Interval | Medium | [insert-interval.js](05-intervals/insert-interval.js) |
| Interval List Intersections | Medium | [interval-list-intersections.js](05-intervals/interval-list-intersections.js) |
| Meeting Rooms II (min rooms needed) | Medium | [meeting-rooms-ii.js](05-intervals/meeting-rooms-ii.js) |
| Meeting Rooms (can attend all?) | Easy | [meeting-rooms.js](05-intervals/meeting-rooms.js) |
| Merge Intervals | Medium | [merge-intervals.js](05-intervals/merge-intervals.js) |
| Minimum Number of Arrows to Burst Balloons | Medium | [minimum-number-of-arrows.js](05-intervals/minimum-number-of-arrows.js) |
| Non-overlapping Intervals | Medium | [non-overlapping-intervals.js](05-intervals/non-overlapping-intervals.js) |

## 06-matrix — Matrix

| Problem | Difficulty | File |
|---|---|---|
| Game of Life (in-place) | Medium | [game-of-life.js](06-matrix/game-of-life.js) |
| Number of Islands (BFS/DFS on grid) | Medium | [number-of-islands.js](06-matrix/number-of-islands.js) |
| Rotate Image (in-place 90deg) | Medium | [rotate-image.js](06-matrix/rotate-image.js) |
| Rotting Oranges (multi-source BFS) | Medium | [rotting-oranges.js](06-matrix/rotting-oranges.js) |
| Search a 2D Matrix | Medium | [search-2d-matrix.js](06-matrix/search-2d-matrix.js) |
| Set Matrix Zeroes | Medium | [set-matrix-zeroes.js](06-matrix/set-matrix-zeroes.js) |
| Spiral Matrix | Medium | [spiral-matrix.js](06-matrix/spiral-matrix.js) |
| Word Search (backtracking on grid) | Medium | [word-search.js](06-matrix/word-search.js) |

## 07-strings-advanced — Strings Advanced

| Problem | Difficulty | File |
|---|---|---|
| Add Strings (as strings, no BigInt) | Easy | [add-strings.js](07-strings-advanced/add-strings.js) |
| Encode and Decode Strings | Medium | [encode-decode-strings.js](07-strings-advanced/encode-decode-strings.js) |
| Group Anagrams | Medium | [group-anagrams.js](07-strings-advanced/group-anagrams.js) |
| Isomorphic Strings | Easy | [isomorphic-strings.js](07-strings-advanced/isomorphic-strings.js) |
| Longest Palindromic Substring | Medium | [longest-palindromic-substring.js](07-strings-advanced/longest-palindromic-substring.js) |
| Longest Valid Parentheses | Hard | [longest-valid-parentheses.js](07-strings-advanced/longest-valid-parentheses.js) |
| Minimum Remove to Make Valid Parentheses | Medium | [min-remove-to-make-valid.js](07-strings-advanced/min-remove-to-make-valid.js) |
| Multiply Strings (as strings, no BigInt) | Medium | [multiply-strings.js](07-strings-advanced/multiply-strings.js) |
| Palindromic Substrings (count them) | Medium | [palindromic-substrings.js](07-strings-advanced/palindromic-substrings.js) |
| Ransom Note | Easy | [ransom-note.js](07-strings-advanced/ransom-note.js) |
| Reverse Words in a String | Medium | [reverse-words-in-string.js](07-strings-advanced/reverse-words-in-string.js) |
| String Compression (in-place) | Medium | [string-compression.js](07-strings-advanced/string-compression.js) |
| Valid Parentheses | Easy | [valid-parentheses.js](07-strings-advanced/valid-parentheses.js) |
| Word Pattern | Easy | [word-pattern.js](07-strings-advanced/word-pattern.js) |

## 08-hashmap-two-sum-family — Hashmap Two Sum Family

| Problem | Difficulty | File |
|---|---|---|
| 4Sum | Medium | [four-sum.js](08-hashmap-two-sum-family/four-sum.js) |
| Two Sum III - Data Structure Design (class with add/find) | Easy | [two-sum-iii-design.js](08-hashmap-two-sum-family/two-sum-iii-design.js) |
| Two Sum IV - Input is a BST | Easy | [two-sum-iv-bst.js](08-hashmap-two-sum-family/two-sum-iv-bst.js) |
| Two Sum Less Than K | Easy | [two-sum-less-than-k.js](08-hashmap-two-sum-family/two-sum-less-than-k.js) |
| Two Sum (classic hashmap) | Easy | [two-sum.js](08-hashmap-two-sum-family/two-sum.js) |

## 09-hashmap-frequency — Hashmap Frequency

| Problem | Difficulty | File |
|---|---|---|
| Find All Duplicates in an Array | Medium | [find-all-duplicates.js](09-hashmap-frequency/find-all-duplicates.js) |
| Find the Duplicate Number | Medium | [find-duplicate-number.js](09-hashmap-frequency/find-duplicate-number.js) |
| First Unique Character in a String | Easy | [first-unique-character.js](09-hashmap-frequency/first-unique-character.js) |
| Majority Element II (elements appearing more than n/3 times) | Medium | [majority-element-ii.js](09-hashmap-frequency/majority-element-ii.js) |
| Majority Element | Easy | [majority-element.js](09-hashmap-frequency/majority-element.js) |
| Single Number | Easy | [single-number.js](09-hashmap-frequency/single-number.js) |
| Sort Characters By Frequency | Medium | [sort-chars-by-frequency.js](09-hashmap-frequency/sort-chars-by-frequency.js) |
| Top K Frequent Elements | Medium | [top-k-frequent-elements.js](09-hashmap-frequency/top-k-frequent-elements.js) |
| Top K Frequent Words | Medium | [top-k-frequent-words.js](09-hashmap-frequency/top-k-frequent-words.js) |
| Valid Anagram | Easy | [valid-anagram.js](09-hashmap-frequency/valid-anagram.js) |

## 10-hashmap-dedup-sets — Hashmap Dedup Sets

| Problem | Difficulty | File |
|---|---|---|
| Contains Duplicate II (within index distance k) | Easy | [contains-duplicate-ii.js](10-hashmap-dedup-sets/contains-duplicate-ii.js) |
| Contains Duplicate III (index distance k, value distance t) | Hard | [contains-duplicate-iii.js](10-hashmap-dedup-sets/contains-duplicate-iii.js) |
| Contains Duplicate | Easy | [contains-duplicate.js](10-hashmap-dedup-sets/contains-duplicate.js) |
| Happy Number | Easy | [happy-number.js](10-hashmap-dedup-sets/happy-number.js) |
| Intersection of Two Arrays | Easy | [intersection-of-two-arrays.js](10-hashmap-dedup-sets/intersection-of-two-arrays.js) |
| Longest Consecutive Sequence | Medium | [longest-consecutive-sequence.js](10-hashmap-dedup-sets/longest-consecutive-sequence.js) |

## 11-hashmap-grouping — Hashmap Grouping

| Problem | Difficulty | File |
|---|---|---|
| Find Common Characters | Easy | [find-common-characters.js](11-hashmap-grouping/find-common-characters.js) |
| Group Shifted Strings | Medium | [group-shifted-strings.js](11-hashmap-grouping/group-shifted-strings.js) |
| Subdomain Visit Count | Medium | [subdomain-visit-count.js](11-hashmap-grouping/subdomain-visit-count.js) |
| Word Subsets | Medium | [word-subsets.js](11-hashmap-grouping/word-subsets.js) |

## 12-design-cache — Design Cache

| Problem | Difficulty | File |
|---|---|---|
| Design In-Memory File System (simplified) | Medium | [design-file-system.js](12-design-cache/design-file-system.js) |
| Design HashMap | Easy | [design-hashmap.js](12-design-cache/design-hashmap.js) |
| Design HashSet | Easy | [design-hashset.js](12-design-cache/design-hashset.js) |
| Design Hit Counter | Medium | [design-hit-counter.js](12-design-cache/design-hit-counter.js) |
| Logger Rate Limiter | Easy | [design-logger-rate-limiter.js](12-design-cache/design-logger-rate-limiter.js) |
| Design Twitter | Medium | [design-twitter-feed.js](12-design-cache/design-twitter-feed.js) |
| Design Underground System | Medium | [design-underground-system.js](12-design-cache/design-underground-system.js) |
| Insert Delete GetRandom O(1) | Medium | [insert-delete-getrandom-o1.js](12-design-cache/insert-delete-getrandom-o1.js) |
| LFU Cache | Hard | [lfu-cache.js](12-design-cache/lfu-cache.js) |
| LRU Cache | Medium | [lru-cache.js](12-design-cache/lru-cache.js) |
| Snapshot Array | Medium | [snapshot-array.js](12-design-cache/snapshot-array.js) |
| Time Based Key-Value Store | Medium | [time-based-kv-store.js](12-design-cache/time-based-kv-store.js) |

## 13-binary-search — Binary Search

| Problem | Difficulty | File |
|---|---|---|
| Binary Search | Easy | [binary-search.js](13-binary-search/binary-search.js) |
| Find Minimum in Rotated Sorted Array | Medium | [find-min-rotated-sorted.js](13-binary-search/find-min-rotated-sorted.js) |
| Find Peak Element | Medium | [find-peak-element.js](13-binary-search/find-peak-element.js) |
| First Bad Version | Easy | [first-bad-version.js](13-binary-search/first-bad-version.js) |
| Koko Eating Bananas | Medium | [koko-eating-bananas.js](13-binary-search/koko-eating-bananas.js) |
| Median of Two Sorted Arrays | Hard | [median-of-two-sorted-arrays.js](13-binary-search/median-of-two-sorted-arrays.js) |
| Search Insert Position | Easy | [search-insert-position.js](13-binary-search/search-insert-position.js) |
| Search in Rotated Sorted Array | Medium | [search-rotated-sorted-array.js](13-binary-search/search-rotated-sorted-array.js) |

## 14-heaps — Heaps

| Problem | Difficulty | File |
|---|---|---|
| Find K Pairs with Smallest Sums | Medium | [find-k-pairs-smallest-sums.js](14-heaps/find-k-pairs-smallest-sums.js) |
| Kth Largest Element in an Array | Medium | [kth-largest-element.js](14-heaps/kth-largest-element.js) |
| Find Median from Data Stream | Hard | [median-from-data-stream.js](14-heaps/median-from-data-stream.js) |
| Merge k Sorted Lists | Hard | [merge-k-sorted-lists.js](14-heaps/merge-k-sorted-lists.js) |
| Task Scheduler | Medium | [task-scheduler.js](14-heaps/task-scheduler.js) |
| Top K Frequent Elements (heap-based) | Medium | [top-k-frequent-elements-heap.js](14-heaps/top-k-frequent-elements-heap.js) |

## 15-trees — Trees

| Problem | Difficulty | File |
|---|---|---|
| Diameter of Binary Tree | Easy | [diameter-of-binary-tree.js](15-trees/diameter-of-binary-tree.js) |
| Invert Binary Tree | Easy | [invert-binary-tree.js](15-trees/invert-binary-tree.js) |
| Kth Smallest Element in a BST | Medium | [kth-smallest-bst.js](15-trees/kth-smallest-bst.js) |
| Binary Tree Level Order Traversal | Medium | [level-order-traversal.js](15-trees/level-order-traversal.js) |
| Lowest Common Ancestor of a BST | Medium | [lowest-common-ancestor-bst.js](15-trees/lowest-common-ancestor-bst.js) |
| Maximum Depth of Binary Tree | Easy | [max-depth-binary-tree.js](15-trees/max-depth-binary-tree.js) |
| Path Sum | Easy | [path-sum.js](15-trees/path-sum.js) |
| Same Tree | Easy | [same-tree.js](15-trees/same-tree.js) |
| Serialize and Deserialize Binary Tree | Hard | [serialize-deserialize-binary-tree.js](15-trees/serialize-deserialize-binary-tree.js) |
| Symmetric Tree | Easy | [symmetric-tree.js](15-trees/symmetric-tree.js) |
| Validate Binary Search Tree | Medium | [validate-bst.js](15-trees/validate-bst.js) |

## 16-tries — Tries

| Problem | Difficulty | File |
|---|---|---|
| Design Search Autocomplete System (simplified) | Hard | [autocomplete-system.js](16-tries/autocomplete-system.js) |
| Implement Trie (Prefix Tree) | Medium | [implement-trie.js](16-tries/implement-trie.js) |
| Design Add and Search Words Data Structure | Medium | [word-dictionary.js](16-tries/word-dictionary.js) |
| Word Search II | Hard | [word-search-ii.js](16-tries/word-search-ii.js) |

## 17-graphs-bfs-dfs — Graphs (BFS/DFS)

| Problem | Difficulty | File |
|---|---|---|
| Clone Graph | Medium | [clone-graph.js](17-graphs-bfs-dfs/clone-graph.js) |
| Course Schedule II | Medium | [course-schedule-ii.js](17-graphs-bfs-dfs/course-schedule-ii.js) |
| Course Schedule | Medium | [course-schedule.js](17-graphs-bfs-dfs/course-schedule.js) |
| Graph Valid Tree | Medium | [graph-valid-tree.js](17-graphs-bfs-dfs/graph-valid-tree.js) |
| Pacific Atlantic Water Flow | Medium | [pacific-atlantic-water-flow.js](17-graphs-bfs-dfs/pacific-atlantic-water-flow.js) |
| Surrounded Regions | Medium | [surrounded-regions.js](17-graphs-bfs-dfs/surrounded-regions.js) |
| Word Ladder | Hard | [word-ladder.js](17-graphs-bfs-dfs/word-ladder.js) |

## 18-graphs-union-find — Graphs (Union-Find)

| Problem | Difficulty | File |
|---|---|---|
| Accounts Merge | Medium | [accounts-merge.js](18-graphs-union-find/accounts-merge.js) |
| Number of Connected Components in an Undirected Graph | Medium | [number-of-connected-components.js](18-graphs-union-find/number-of-connected-components.js) |
| Number of Provinces | Medium | [number-of-provinces.js](18-graphs-union-find/number-of-provinces.js) |
| Redundant Connection | Medium | [redundant-connection.js](18-graphs-union-find/redundant-connection.js) |

## 19-graphs-dijkstra — Graphs (Dijkstra)

| Problem | Difficulty | File |
|---|---|---|
| Cheapest Flights Within K Stops | Medium | [cheapest-flights-within-k-stops.js](19-graphs-dijkstra/cheapest-flights-within-k-stops.js) |
| Network Delay Time | Medium | [network-delay-time.js](19-graphs-dijkstra/network-delay-time.js) |
| Path With Minimum Effort | Medium | [path-with-minimum-effort.js](19-graphs-dijkstra/path-with-minimum-effort.js) |

## 20-randomized — Randomized

| Problem | Difficulty | File |
|---|---|---|
| Insert Delete GetRandom O(1) - Duplicates allowed | Hard | [insert-delete-getrandom-o1-duplicates.js](20-randomized/insert-delete-getrandom-o1-duplicates.js) |
| Random Pick Index | Medium | [random-pick-index.js](20-randomized/random-pick-index.js) |
| Random Pick with Weight | Medium | [random-pick-with-weight.js](20-randomized/random-pick-with-weight.js) |
| Shuffle an Array | Medium | [shuffle-an-array.js](20-randomized/shuffle-an-array.js) |

## 21-bit-manipulation — Bit Manipulation

| Problem | Difficulty | File |
|---|---|---|
| Counting Bits | Easy | [count-bits.js](21-bit-manipulation/count-bits.js) |
| Maximum XOR of Two Numbers in an Array | Medium | [maximum-xor-of-two-numbers.js](21-bit-manipulation/maximum-xor-of-two-numbers.js) |
| Missing Number | Easy | [missing-number.js](21-bit-manipulation/missing-number.js) |
| Single Number II | Medium | [single-number-ii.js](21-bit-manipulation/single-number-ii.js) |
| Single Number III | Medium | [single-number-iii.js](21-bit-manipulation/single-number-iii.js) |
| Total Hamming Distance | Medium | [total-hamming-distance.js](21-bit-manipulation/total-hamming-distance.js) |

## 22-backtracking — Backtracking

| Problem | Difficulty | File |
|---|---|---|
| Combination Sum | Medium | [combination-sum.js](22-backtracking/combination-sum.js) |
| Generate Parentheses | Medium | [generate-parentheses.js](22-backtracking/generate-parentheses.js) |
| Letter Combinations of a Phone Number | Medium | [letter-combinations-phone.js](22-backtracking/letter-combinations-phone.js) |
| N-Queens | Hard | [n-queens.js](22-backtracking/n-queens.js) |
| Permutations | Medium | [permutations.js](22-backtracking/permutations.js) |
| Subsets | Medium | [subsets.js](22-backtracking/subsets.js) |

## 23-dynamic-programming — Dynamic Programming

| Problem | Difficulty | File |
|---|---|---|
| 0/1 Knapsack | Medium | [0-1-knapsack.js](23-dynamic-programming/0-1-knapsack.js) |
| Climbing Stairs | Easy | [climbing-stairs.js](23-dynamic-programming/climbing-stairs.js) |
| Coin Change | Medium | [coin-change.js](23-dynamic-programming/coin-change.js) |
| Edit Distance | Hard | [edit-distance.js](23-dynamic-programming/edit-distance.js) |
| House Robber | Medium | [house-robber.js](23-dynamic-programming/house-robber.js) |
| Longest Common Subsequence | Medium | [longest-common-subsequence.js](23-dynamic-programming/longest-common-subsequence.js) |
| Longest Increasing Subsequence | Medium | [longest-increasing-subsequence.js](23-dynamic-programming/longest-increasing-subsequence.js) |
| Word Break | Medium | [word-break.js](23-dynamic-programming/word-break.js) |
