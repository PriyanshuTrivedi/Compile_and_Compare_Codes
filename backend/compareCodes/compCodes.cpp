/*Carry on my wayward son,
There'll be peace when you are done
Lay your weary head to rest
Don't you cry no more...*/

#include <bits/stdc++.h>
using namespace std;
#define cout std::cout
#define cin std::cin
using ll=long long;

int main(){

    freopen("finalRes.txt","w",stdout);

    fstream f1, f2;
    char c1, c2;
    int flag=3;

    string outputFile1="outputCode1.txt";
    string outputFile2="outputCode2.txt";

    f1.open(outputFile1,ios::in);

    f2.open(outputFile2,ios::in);

    long long k=0;

    while(1){
        c1=f1.get();
        c2=f2.get();
        if(c1!=c2){
            flag=0;
            break;
        }
        k++;
        if((c1==EOF)||(c2==EOF))
            break;
    }
    f1.close();
    f2.close();
    
    if(flag)
        cout<<"Both the codes give the same output when run on the current inputs.\n";
    else
        cout<<"Outputs Differ at "<<k<<"th character. Code 1 gives "<<c1<<" while Code 2 gives "<<c2<<".\n";

    return 0;
}