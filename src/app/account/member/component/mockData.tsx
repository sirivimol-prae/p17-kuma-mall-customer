// สร้าง interface สำหรับข้อมูลสมาชิก
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

// สร้าง interface สำหรับข้อมูลระดับสมาชิก
export interface MembershipLevel {
  id: string;
  name: string;
  minAmount: number;
  maxAmount: number;
  iconPath: string;
  description: string;
  isActive: boolean;
}

// ข้อมูลสมาชิกจำลอง
export const membershipData: MembershipData = {
  currentStatus: 'KUMAま FRIEND',
  nextStatus: 'KUMAま CLOSE FRIEND',
  currentAmount: 5000,
  targetAmount: 15000,
  expiryDate: '22/07/2025',
  profileImage: '/images/profile.png',
  statusImage: '/images/kuma-friend.png',
  isLoggedIn: true // เพิ่มสถานะการล็อกอิน
};

// ข้อมูลระดับสมาชิกทั้งหมดตามข้อกำหนดใหม่
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
    maxAmount: 15000,
    iconPath: '/images/kuma-friend.png',
    description: '(สถานะปัจจุบัน)',
    isActive: membershipData.isLoggedIn && membershipData.currentAmount <= 15000
  },
  {
    id: 'close-friend',
    name: 'KUMAま CLOSE FRIEND',
    minAmount: 15001,
    maxAmount: 35000,
    iconPath: '/images/kuma-close-friend-level.png',
    description: '',
    isActive: membershipData.isLoggedIn && membershipData.currentAmount > 15000 && membershipData.currentAmount <= 35000
  },
  {
    id: 'best-friend',
    name: 'KUMAま BEST FRIEND',
    minAmount: 35001,
    maxAmount: Number.MAX_SAFE_INTEGER, // ไม่จำกัดยอดสูงสุด
    iconPath: '/images/kuma-best-friend-level.png',
    description: '',
    isActive: membershipData.isLoggedIn && membershipData.currentAmount > 35000
  }
];