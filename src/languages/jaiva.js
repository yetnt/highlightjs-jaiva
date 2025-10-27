/*
Language: Jaiva
Description: A very fun language trust
Author: Lehlogonolo Poole <hlonipoole292@gmail.com>
Category: scripting
*/

module.exports = function (hljs) {
    var KEYWORDS = {
        keyword:
            "if colonize nikhil kwenza khutla mara zama chaai however with tsea maak cima",
        literal: "true false yebo aowa idk",
        built_in:
            "khuluma scope getVarClass typeOf arrLit neg version args uargs reservedKeywords mamela sleep flat",
    };
    var NUMBER = {
        className: "number",
        variants: [
            { begin: "\\b(0b[01]+)" },
            { begin: "\\b(0c[0-7]+)" },
            { begin: "\\b(0x[0-7A-F]+)" },
            { begin: hljs.C_NUMBER_RE },
        ],
        relevance: 0,
    };

    const allKeywords = (KEYWORDS.keyword + " " + KEYWORDS.literal).split(
        /\s+/
    );
    const keywordPattern = allKeywords
        .map((k) => k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
        .join("|");

    return {
        name: "jaiva",
        aliases: ["jva", "jiv"],
        keywords: KEYWORDS,
        case_insensitive: true,
        disableAutodetect: false,
        contains: [
            hljs.APOS_STRING_MODE,
            hljs.QUOTE_STRING_MODE,
            NUMBER,

            // Single-line comment: @
            {
                className: "comment",
                begin: "@(?!\\*)", // Match @ not followed by *
                end: "$",
            },

            // Doc comment: @*
            {
                className: "doctag",
                begin: "@\\*",
                end: "$",
            },

            // Multi-line comment: { ... }
            {
                className: "comment",
                begin: "\\{",
                end: "\\}",
            },

            // Block delimiters: -> and <~
            {
                className: "punctuation",
                begin: "->|<~",
            },
            // {
            //     className: "meta",
            //     begin: '\\$[$ntrbf"=!,@]',
            //     relevance: 8,
            // },
            {
                className: "string",
                begin: '"',
                end: '"',
                illegal: "\\n", // prevent multiline strings
                contains: [
                    {
                        begin: "\\$", // escape sequences
                        end: '[$ntrbf"=!,@]',
                        className: "symbol",
                    },
                ],
            },
            {
                className: "operator",
                begin: "(=>|<-|<-\\||%|\\^|\\-|\\+|\\/|\\*|x<|x>|<<|>>|<=|>=|<|>|=|!=|\\?|\\|\\||\\&\\&|\\||\\&)",
            },
            // {
            //     className: "punctuation",
            //     begin: "[\\(\\)\\[\\]]",
            // },
            {
                className: "meta",
                begin: "\\?|F~|!|V~",
            },
            // Function names
            {
                className: "title function_",
                begin: "\\b(?:\\*\\s*)?[a-zA-Z_][a-zA-Z0-9_]*(?=\\()",
                relevance: 5,
            },
            {
                className: "variable",
                begin: new RegExp(
                    `\\b(?!${keywordPattern})[a-zA-Z_][a-zA-Z0-9_]*\\b`
                ),
                relevance: 0,
            },

            // Variable names
            // {
            //     className: "variable",
            //     begin: "\\b[a-zA-Z_][a-zA-Z0-9_]*\\b",
            //     relevance: 0,
            // },
        ],
    };
};
