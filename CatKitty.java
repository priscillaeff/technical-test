import java.util.*;

public class CatKitty {
    // Map for custom rules with key-value
    private static Map<Integer, String> rules = new HashMap<>();

    public static void main(String[] args) {
        // Example of adding a new rule, (number 13 = "dog")
        addRule(13, "dog");
        
        // Ask the user for the limit number
        Scanner userInput = new Scanner(System.in);
        System.out.println("Masukkan batas: ");
        int n =  userInput.nextInt();

        userInput.close();

        boolean first = true;

        // Iterate from 1 to n
        for (int x = 1; x <= n; x++){
            //Handle comma (add comma if it's not the first number)
            if(!first){
                System.out.print(", ");
            }

            // Check if there is a custom rule for number x
            if(rules.containsKey(x)){
                System.out.print(rules.get(x));
            } 
            // Print "catKitty" if x is divisible by both 3 and 5
            else if (x % 3 == 0 && x % 5 == 0){
                System.out.print("catKitty");
            } 
            // Print "cat" if x is divisible by 3
            else if (x % 3 == 0){
                System.out.print("cat");
            } 
            // Print "kitty" if x is divisible by 5
            else if (x % 5 == 0){
                System.out.print("kitty");
            } else {
                System.out.print(x);
            }

            // Prepare for the next output with comma
            first = false;
        }
    }

    // Function to add a rule with a number and its corresponding output
    public static void addRule(int number, String output){
        rules.put(number, output);
    }
}