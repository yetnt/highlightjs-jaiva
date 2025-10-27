"use strict";

const hljs = require("highlight.js/lib/core");
hljs.debugMode(); // tests run in debug mode so errors are raised

// Tests for auto detection for jaiva via `highlightAuto`.
require("./detect");

// HTML markup tests for jaiva.
require("./markup");
