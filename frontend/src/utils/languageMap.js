import { langs } from "@uiw/codemirror-extensions-langs";

const languageMap = {
  CPP: langs.cpp(),
  JAVASCRIPT: langs.javascript(),
  PYTHON: langs.python(),
  C: langs.c(),
  JAVA: langs.java(),
  GO: langs.go(),
  RUBY: langs.ruby(),
  RUST: langs.rust(),
  PHP: langs.php(),
  PERL: langs.perl(),
};

export { languageMap };