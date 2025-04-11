import java.util.*;
import java.util.HashMap;
import java.util.Map;

public class CatKitty {
    //Map untuk aturan custom dengan key-value
    private static Map<Integer, String> rules = new HashMap<>();

    public static void main(String[] args) {
        //Contoh menambah aturan baru, (angka 13 = "dog")
        addRule(13, "dog");
        
        //Meminta input dari user untuk batas jumlah angka
        Scanner userInput = new Scanner(System.in);
        System.out.println("Masukkan batas: ");
        int n =  userInput.nextInt();

        userInput.close();

        boolean first = true;

        //iterasi dari 1 sampai n
        for (int x = 1; x <= n; x++){
            //handle koma (jika bukan angka pertama, tambahkan koma)
            if(!first){
                System.out.print(", ");
            }

            //Cek jika ada aturan khusus untuk angka x
            if(rules.containsKey(x)){
                System.out.print(rules.get(x));
            } 
            //Print "catKitty" jika angka x habis dibagi 3 dan 5
            else if (x % 3 == 0 && x % 5 == 0){
                System.out.print("catKitty");
            } 
            //Print "cat" jika angka x havis dibagi 3
            else if (x % 3 == 0){
                System.out.print("cat");
            } 
            //Print "kitty" jika angka x habis dibagi 5
            else if (x % 5 == 0){
                System.out.print("kitty");
            } else {
                System.out.print(x);
            }

            //Membuat koma sebelum output berikutnya
            first = false;
        }
    }

    //Fungsi untuk menambahkan rule angka dan output
    public static void addRule(int number, String output){
        rules.put(number, output);
    }
}