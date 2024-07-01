const templates = {
  cpp: `
  // C++ Template
  #include <iostream>
  
  int main() {
      std::cout << "Hello, World!" << std::endl;
      return 0;
  }
  `,
  c: `
  // C Template
  #include <stdio.h>
  
  int main() {
      printf("Hello, World!\\n");
      return 0;
  }
  `,
  java: `
  // Java Template
  public class Solution {
      public static void main(String[] args) {
          System.out.println("Hello, World!");
      }
  }
  `,
  python: `
  # Python Template
  print("Hello, World!")
  `,
  ruby: `
  // Ruby Template
  puts "Hello, World!"
  `,
  go: `
  // Go Template
  package main
  
  import "fmt"
  
  func main() {
      fmt.Println("Hello, World!")
  }
  `,
  php: `
  // PHP Template
  <?php
  echo "Hello, World!\\n";
  ?>
  `,
};

export default templates;
