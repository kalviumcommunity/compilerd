import { langs } from "@uiw/codemirror-extensions-langs";

const langMap = {
  JAVASCRIPT: langs.javascript(),
  PYTHON: langs.python(),
  JAVA: langs.java(),
  C: langs.c(),
  CPP: langs.cpp(),
  GO: langs.go(),
  RUBY: langs.ruby(),
  TYPESCRIPT: langs.typescript(),
  PHP: langs.php(),
};

export { langMap };
