import { langs } from "@uiw/codemirror-extensions-langs";

const languageMap = {
  CPP: langs.cpp(),
  JAVASCRIPT: langs.javascript(),
  PYTHON: langs.python(),
  C: langs.c(),
  JAVA: langs.java(),
  RUBY: langs.ruby(),
  GO: langs.go(),
  RUST: langs.rust(),
  PHP: langs.php(),
  TYPESCRIPT: langs.typescript(),
};

export { languageMap };