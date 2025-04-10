import java.util.*;

public class Palindrome {
    public static void main(String args[]){
        int x, y, temp;
        y = 0;
        
        //Meminta input dari user
        Scanner userInput = new Scanner(System.in);
        System.out.print("x = ");
        String input = userInput.nextLine();
        
        //Konversi input menjadi integer
        int num = Integer.parseInt(input);
        
        //Mengecek bilangan negatif (bilangan negatif bukan palindrome)
        if (num < 0){
            System.out.println("false");
            userInput.close();
            return;
        }

        temp = num; //Simpan nilai asli untuk dibandingkan di akhir

        //Memutar balik angka
        while (num > 0){
            x = num % 10; //Menganbil digit terakhir
            y = y * 10 + x; //Menambah dan menyimpan angka yang dibalik
            num = num / 10; 
        }

        if (temp == y){
            System.out.println("true");
        } else{
            System.out.println("false");
        }
        userInput.close();
    }
}