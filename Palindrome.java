import java.util.*;

public class Palindrome {
    public static void main(String args[]){
        int x, y, temp;
        y = 0;
        
        // Ask for user input
        Scanner userInput = new Scanner(System.in);
        System.out.print("x = ");
        String input = userInput.nextLine();
        
        // Convert input to integer
        int num = Integer.parseInt(input);
        
        // Check if the number is negative (negative numbers are not palindromes)
        if (num < 0){
            System.out.println("false");
            userInput.close();
            return;
        }

        temp = num; // Save the original value for comparison later

        // Reverse the number
        while (num > 0){
            x = num % 10; // Take the last digit
            y = y * 10 + x; // Add and save the reversed number
            num = num / 10; 
        }

        // Compare reversed number with the original
        if (temp == y){
            System.out.println("true");
        } else{
            System.out.println("false");
        }
        userInput.close();
    }
}