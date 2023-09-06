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
    ll t,n,i;
    cin>>t;
    while(t--)
    {
        cin>>n;
        ll sq=sqrt(n);
        if(sq==n)
        n--;
        cout<<n<<"\n";
    }
    return 0;
}