/*Carry on my wayward son,
There'll be peace when you are done
Lay your weary head to rest
Don't you cry no more...*/

#include <bits/stdc++.h>
using namespace std;
#define cout std::cout
#define cin std::cin
using ll=long long;

int main(void)
{
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    cout.tie(NULL);
    freopen("input.txt","r",stdin);
    srand(time(0));

    ll t,i,k,n_lowLimit,n_highLimit,n,diff,diff1,arri_lowLimit,arri_highLimit;

    ofstream testcases("testcases.txt");

    cin>>t>>n_lowLimit>>n_highLimit>>arri_lowLimit>>arri_highLimit;

    testcases<<t<<"\n";

    while(t--)
    {
        diff=n_highLimit-n_lowLimit+1;
        diff1=arri_highLimit-arri_lowLimit+1;

        n=rand()+1;
        while(n<1e5)
        n*=rand()+1;
        n%=diff;
        n+=n_lowLimit;

        testcases<<n<<"\n";

        for(i=0;i<n;i++)
        {
            k=rand()+1;
            while(k<1e15)
            k*=rand()+1;
            k%=diff1;
            k+=arri_lowLimit;
            testcases<<k<<" ";
        }
        testcases<<"\n";
    }
    
    return 0;
}