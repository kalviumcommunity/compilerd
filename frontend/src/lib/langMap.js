import { langs } from "@uiw/codemirror-extensions-langs";

const langMap = {
  Javascript: langs.javascript(),
  Python: langs.python(),
  Java: langs.java(),
  C: langs.c(),
  CPP: langs.cpp(),
  GoLang: langs.go(),
  Ruby: langs.ruby(),
  TypeScript: langs.typescript(),
  PHP: langs.php(),
};

export { langMap };
