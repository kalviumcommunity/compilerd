# Test Case 1: Basic output
puts "Hello, Ruby!"

# Test Case 2: Variable manipulation
x = 5
y = 10
puts "Sum: #{x + y}"

# Test Case 3: Conditional statements
age = 18
if age >= 18
  puts "Adult"
else
  puts "Minor"
end

# Test Case 4: Loops
(1..5).each { |i| print "#{i} " }
puts

# Test Case 5: Function definition and call
def square(x)
  x * x
end

puts "Square of 7: #{square(7)}"