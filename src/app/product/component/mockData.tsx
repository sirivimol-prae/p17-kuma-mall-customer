import { exportTraceState } from "next/dist/trace";

export interface DiscountInfo {
    type: 'FRIEND' | 'BEST_FRIEND';
    image: string;
    percentage: number;
  }
  
  export interface CoinCard {
    id: string;
    title: string;
    image: string;
    price: number;
    expireDate: string;
    canGift: boolean;
    discount?: DiscountInfo;
  }
  
  export const coinCards: CoinCard[] = [
    {
      id: '1000coin',
      title: 'บัตรเติม 1000 Coin',
      image: '/images/card1.png',
      price: 990,
      expireDate: '31/12/2025',
      canGift: true,
    },
    {
      id: '3000coin',
      title: 'บัตรเติม 3000 Coin',
      image: '/images/card2.png',
      price: 2950,
      expireDate: '31/12/2025',
      canGift: true,
    },
    {
      id: '5000coin',
      title: 'บัตรเติม 5000 Coin',
      image: '/images/card3.png',
      price: 4850,
      expireDate: '31/12/2025',
      canGift: true,
    },
    {
      id: '10000coin',
      title: 'บัตรเติม 10000 Coin',
      image: '/images/card4.png',
      price: 9500,
      expireDate: '31/12/2025',
      canGift: true,
    },
    {
      id: '15000coin',
      title: 'บัตรเติม 15000 Coin',
      image: '/images/card5.png',
      price: 13900,
      expireDate: '31/12/2025',
      canGift: true,
      discount: {
        type: 'FRIEND',
        image: '/images/5Discount.png',
        percentage: 5
      }
    },
    {
      id: '25000coin',
      title: 'บัตรเติม 25000 Coin',
      image: '/images/card6.png',
      price: 22900,
      expireDate: '31/12/2025',
      canGift: true,
    },
    {
      id: '35000coin',
      title: 'บัตรเติม 35000 Coin',
      image: '/images/card7.png',
      price: 31900,
      expireDate: '31/12/2025',
      canGift: true,
      discount: {
        type: 'BEST_FRIEND',
        image: '/images/7Discount.png',
        percentage: 7
      }
    }
  ];

<<<<<<< Updated upstream
exportTraceState
=======
  

  export const Mubmib_check:any = [
    {
      "hello" : "world"
    }
  ]
>>>>>>> Stashed changes
