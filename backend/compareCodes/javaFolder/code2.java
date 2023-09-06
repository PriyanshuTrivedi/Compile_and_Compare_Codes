package javaFolder; import java.io.*;
class code2{
    public static void main(String[] args) throws IOException{
        BufferedReader br=new BufferedReader(new InputStreamReader(System.in));
        int t=Integer.parseInt(br.readLine());
        while(t-->0){
            int i,n;
            n=Integer.parseInt(br.readLine());
            String[] str=(br.readLine()).split(" ");
            int[] arr=new int[n];
            long s=0;
            for(i=0;i<n;i++)
            arr[i]=Integer.parseInt(str[i]);
            for(i=0;i<n;i++)
            s+=arr[i];
            System.out.println(s*s);
        }
    }
}
