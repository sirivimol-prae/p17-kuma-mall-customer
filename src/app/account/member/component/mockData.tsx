
export interface MembershipData {
  currentStatus: string;
  nextStatus: string;
  currentAmount: number;
  targetAmount: number;
  expiryDate: string;
  profileImage: string;
  statusImage: string;
  isLoggedIn: boolean;
}


export interface MembershipLevel {
  id: string;
  name: string;
  minAmount: number;
  maxAmount: number;
  iconPath: string;
  description: string;
  isActive: boolean;
}


export const membershipData: MembershipData = {
  currentStatus: 'KUMAま FRIEND',
  nextStatus: 'KUMAま CLOSE FRIEND',
  currentAmount: 5000,
  targetAmount: 15000,
  expiryDate: '22/07/2025',
  profileImage: '/images/profile.png',
  statusImage: '/images/kuma-friend.png',
  isLoggedIn: true 
};


const getCurrentMembershipStatus = (amount: number, isLoggedIn: boolean): string => {
  if (!isLoggedIn) return 'KUMAま MALL';
  if (amount <= 14999) return 'KUMAま FRIEND';
  if (amount <= 34999) return 'KUMAま CLOSE FRIEND';
  return 'KUMAま BEST FRIEND';
};


const getNextMembershipStatus = (amount: number, isLoggedIn: boolean): string => {
  if (!isLoggedIn) return 'KUMAま FRIEND';
  if (amount <= 14999) return 'KUMAま CLOSE FRIEND';
  if (amount <= 34999) return 'KUMAま BEST FRIEND';
  return ''
};


const getStatusImage = (status: string): string => {
  switch (status) {
    case 'KUMAま MALL': return '/images/kuma-mall-level.png';
    case 'KUMAま FRIEND': return '/images/kuma-friend.png';
    case 'KUMAま CLOSE FRIEND': return '/images/kuma-close-friend-level.png';
    case 'KUMAま BEST FRIEND': return '/images/kuma-best-friend-level.png';
    default: return '/images/kuma-friend.png';
  }
};

membershipData.currentStatus = getCurrentMembershipStatus(membershipData.currentAmount, membershipData.isLoggedIn);
membershipData.nextStatus = getNextMembershipStatus(membershipData.currentAmount, membershipData.isLoggedIn);
membershipData.statusImage = getStatusImage(membershipData.currentStatus);

const getTargetAmount = (status: string): number => {
  switch (status) {
    case 'KUMAま FRIEND': return 15000;
    case 'KUMAま CLOSE FRIEND': return 35000;
    default: return membershipData.currentAmount;
  }
};

membershipData.targetAmount = getTargetAmount(membershipData.currentStatus);

export const membershipLevels: MembershipLevel[] = [
  {
    id: 'mall',
    name: 'KUMAま MALL',
    minAmount: 0,
    maxAmount: 0,
    iconPath: '/images/kuma-mall-level.png',
    description: 'สำหรับผู้ใช้ที่ยังไม่ได้ทำการล็อกอิน',
    isActive: !membershipData.isLoggedIn
  },
  {
    id: 'friend',
    name: 'KUMAま FRIEND',
    minAmount: 0,
    maxAmount: 14999,
    iconPath: '/images/kuma-friend.png',
    description: membershipData.currentStatus === 'KUMAま FRIEND' ? '(สถานะปัจจุบัน)' : '',
    isActive: membershipData.isLoggedIn && membershipData.currentAmount <= 14999
  },
  {
    id: 'close-friend',
    name: 'KUMAま CLOSE FRIEND',
    minAmount: 15000,
    maxAmount: 34999,
    iconPath: '/images/kuma-close-friend-level.png',
    description: membershipData.currentStatus === 'KUMAま CLOSE FRIEND' ? '(สถานะปัจจุบัน)' : '',
    isActive: membershipData.isLoggedIn && membershipData.currentAmount >= 15000 && membershipData.currentAmount <= 34999
  },
  {
    id: 'best-friend',
    name: 'KUMAま BEST FRIEND',
    minAmount: 35000,
    maxAmount: Number.MAX_SAFE_INTEGER,
    iconPath: '/images/kuma-best-friend-level.png',
    description: membershipData.currentStatus === 'KUMAま BEST FRIEND' ? '(สถานะปัจจุบัน)' : '',
    isActive: membershipData.isLoggedIn && membershipData.currentAmount >= 35000
  }
];