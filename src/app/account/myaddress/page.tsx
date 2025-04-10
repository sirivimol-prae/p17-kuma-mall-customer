'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link';
import { ArrowLeft, X, Check, ChevronDown, Plus, CheckCircle } from 'lucide-react'
import AccountSidebar from '../component/sidebar';

interface AddressType {
  id: number;
  recipientName: string;
  phone: string;
  addressType: 'home' | 'office' | 'other';
  addressDetail: string;
  houseNumber: string;
  village: string;
  soi: string;
  road: string;
  subdistrict: string;
  district: string;
  province: string;
  postalCode: string;
  isDefault: boolean;
}

interface NewAddressType {
  name: string;
  phone: string;
  addressType: 'home' | 'office' | 'other';
  houseNumber: string;
  village: string;
  soi: string;
  road: string;
  subdistrict: string;
  district: string;
  province: string;
  postalCode: string;
  isDefault: boolean;
}

const thaiProvinces = [
  'กรุงเทพมหานคร', 'กระบี่', 'กาญจนบุรี', 'กาฬสินธุ์', 'กำแพงเพชร', 'ขอนแก่น', 'จันทบุรี', 'ฉะเชิงเทรา',
  'ชลบุรี', 'ชัยนาท', 'ชัยภูมิ', 'ชุมพร', 'เชียงราย', 'เชียงใหม่', 'ตรัง', 'ตราด', 'ตาก', 'นครนายก',
  'นครปฐม', 'นครพนม', 'นครราชสีมา', 'นครศรีธรรมราช', 'นครสวรรค์', 'นนทบุรี', 'นราธิวาส', 'น่าน',
  'บึงกาฬ', 'บุรีรัมย์', 'ปทุมธานี', 'ประจวบคีรีขันธ์', 'ปราจีนบุรี', 'ปัตตานี', 'พระนครศรีอยุธยา', 'พะเยา',
  'พังงา', 'พัทลุง', 'พิจิตร', 'พิษณุโลก', 'เพชรบุรี', 'เพชรบูรณ์', 'แพร่', 'ภูเก็ต', 'มหาสารคาม', 'มุกดาหาร',
  'แม่ฮ่องสอน', 'ยโสธร', 'ยะลา', 'ร้อยเอ็ด', 'ระนอง', 'ระยอง', 'ราชบุรี', 'ลพบุรี', 'ลำปาง', 'ลำพูน',
  'เลย', 'ศรีสะเกษ', 'สกลนคร', 'สงขลา', 'สตูล', 'สมุทรปราการ', 'สมุทรสงคราม', 'สมุทรสาคร', 'สระแก้ว',
  'สระบุรี', 'สิงห์บุรี', 'สุโขทัย', 'สุพรรณบุรี', 'สุราษฎร์ธานี', 'สุรินทร์', 'หนองคาย', 'หนองบัวลำภู',
  'อ่างทอง', 'อำนาจเจริญ', 'อุดรธานี', 'อุตรดิตถ์', 'อุทัยธานี', 'อุบลราชธานี'
];

const bangkokDistricts = [
  'เขตพระนคร', 'เขตดุสิต', 'เขตหนองจอก', 'เขตบางรัก', 'เขตบางเขน', 'เขตบางกะปิ', 'เขตปทุมวัน',
  'เขตป้อมปราบศัตรูพ่าย', 'เขตพระโขนง', 'เขตมีนบุรี', 'เขตลาดกระบัง', 'เขตยานนาวา', 'เขตสัมพันธวงศ์',
  'เขตพญาไท', 'เขตธนบุรี', 'เขตบางกอกใหญ่', 'เขตห้วยขวาง', 'เขตคลองสาน', 'เขตตลิ่งชัน', 'เขตบางกอกน้อย',
  'เขตบางขุนเทียน', 'เขตภาษีเจริญ', 'เขตหนองแขม', 'เขตราษฎร์บูรณะ', 'เขตบางพลัด', 'เขตดินแดง',
  'เขตบึงกุ่ม', 'เขตสาทร', 'เขตบางซื่อ', 'เขตจตุจักร', 'เขตบางคอแหลม', 'เขตประเวศ', 'เขตคลองเตย',
  'เขตสวนหลวง', 'เขตจอมทอง', 'เขตดอนเมือง', 'เขตราชเทวี', 'เขตลาดพร้าว', 'เขตวัฒนา', 'เขตบางแค',
  'เขตหลักสี่', 'เขตสายไหม', 'เขตคันนายาว', 'เขตสะพานสูง', 'เขตวังทองหลาง', 'เขตคลองสามวา',
  'เขตบางนา', 'เขตทวีวัฒนา', 'เขตทุ่งครุ', 'เขตบางบอน'
];

const klongToeiSubdistricts = ['แขวงคลองเตย', 'แขวงคลองตัน', 'แขวงพระโขนง', 'แขวงคลองเตยเหนือ', 'แขวงคลองตันเหนือ'];

const getDistrictsByProvince = (province: string) => {
  if (province === 'กรุงเทพมหานคร') {
    return bangkokDistricts;
  }
  return ['อำเภอเมือง', 'อำเภอบางปะกง', 'อำเภอบ้านโพธิ์', 'อำเภอบางน้ำเปรี้ยว'];
};

const getSubdistrictsByDistrict = (district: string) => {
  if (district === 'เขตคลองเตย') {
    return klongToeiSubdistricts;
  }
  return ['ตำบลในเมือง', 'ตำบลเกาะขนุน', 'ตำบลบ้านใหม่', 'ตำบลคลองนครเนื่องเขต'];
};

const getPostalCodeBySubdistrict = (subdistrict: string) => {
  const postalCodes: {[key: string]: string} = {
    'แขวงคลองเตย': '10110',
    'แขวงคลองตัน': '10110',
    'แขวงพระโขนง': '10110',
    'ตำบลในเมือง': '24000',
    'ตำบลเกาะขนุน': '24000',
    'ตำบลบ้านใหม่': '24000',
  };
  return postalCodes[subdistrict] || '';
};

export default function Page(): React.ReactElement {
  const inputClassName = "w-full px-4 py-2 border border-gray-300 rounded text-[16px] text-[#5F6368]";
  const phoneInputClassName = "flex-1 px-4 py-2 border border-gray-300 rounded-r text-[16px] text-[#5F6368]";
  const selectClassName = "w-full px-4 py-2 border border-gray-300 rounded text-[16px] text-[#5F6368] appearance-none bg-white";
  const dropdownWrapperClassName = "relative";
  const dropdownIconClassName = "absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-500";

  const [addresses, setAddresses] = useState<AddressType[]>([
    {
      id: 1,
      recipientName: "XXXXX XXXXXXXX",
      phone: "(+66) 81-123-4567",
      addressType: "home",
      addressDetail: "8/13 ซอย XXXXX ถนน YYYYYYY แขวงคลองตัน เขตคลองเตย กรุงเทพมหานคร 10110",
      houseNumber: "8/13",
      village: "",
      soi: "XXXXX",
      road: "YYYYYYY",
      subdistrict: "แขวงคลองตัน",
      district: "เขตคลองเตย",
      province: "กรุงเทพมหานคร",
      postalCode: "10110",
      isDefault: true
    }
  ]);

  const [selectedAddress, setSelectedAddress] = useState<number>(1);
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<boolean>(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [editingAddressId, setEditingAddressId] = useState<number | null>(null);
  const [deleteAddressId, setDeleteAddressId] = useState<number | null>(null);
  
  const [newAddress, setNewAddress] = useState<NewAddressType>({
    name: '',
    phone: '',
    addressType: 'home',
    houseNumber: '',
    village: '',
    soi: '',
    road: '',
    subdistrict: '',
    district: '',
    province: '',
    postalCode: '',
    isDefault: false
  });

  const [districtOptions, setDistrictOptions] = useState<string[]>([]);
  
  const [subdistrictOptions, setSubdistrictOptions] = useState<string[]>([]);
  
  useEffect(() => {
    if (newAddress.province) {
      const districts = getDistrictsByProvince(newAddress.province);
      setDistrictOptions(districts);
      
      setNewAddress(prev => ({
        ...prev,
        district: '',
        subdistrict: '',
        postalCode: ''
      }));
      setSubdistrictOptions([]);
    }
  }, [newAddress.province]);
  
  useEffect(() => {
    if (newAddress.district) {
      const subdistricts = getSubdistrictsByDistrict(newAddress.district);
      setSubdistrictOptions(subdistricts);
      
      setNewAddress(prev => ({
        ...prev,
        subdistrict: '',
        postalCode: ''
      }));
    }
  }, [newAddress.district]);
  
  useEffect(() => {
    if (newAddress.subdistrict) {
      const postalCode = getPostalCodeBySubdistrict(newAddress.subdistrict);
      setNewAddress(prev => ({
        ...prev,
        postalCode
      }));
    }
  }, [newAddress.subdistrict]);

  const handleRadioSelect = (id: number): void => {
    setSelectedAddress(id);
    
    setAddresses(addresses.map(address => ({
      ...address,
      isDefault: address.id === id
    })));

    setSuccessMessage("อัพเดตที่อยู่ปัจจุบันเรียบร้อยแล้ว");
    setShowSuccessAlert(true);
    
    setTimeout(() => {
      setShowSuccessAlert(false);
    }, 3000);
  };

  const handleAddAddress = (): void => {
    setNewAddress({
      name: '',
      phone: '',
      addressType: 'home',
      houseNumber: '',
      village: '',
      soi: '',
      road: '',
      subdistrict: '',
      district: '',
      province: '',
      postalCode: '',
      isDefault: false
    });
    setDistrictOptions([]);
    setSubdistrictOptions([]);
    setShowAddModal(true);
  };

  const handleEditAddress = (id: number): void => {
    const addressToEdit = addresses.find(address => address.id === id);
    if (addressToEdit) {
      const editAddress: NewAddressType = {
        name: addressToEdit.recipientName,
        phone: addressToEdit.phone.replace('(+66) ', ''),
        addressType: addressToEdit.addressType,
        houseNumber: addressToEdit.houseNumber,
        village: addressToEdit.village,
        soi: addressToEdit.soi,
        road: addressToEdit.road,
        subdistrict: addressToEdit.subdistrict,
        district: addressToEdit.district,
        province: addressToEdit.province,
        postalCode: addressToEdit.postalCode,
        isDefault: addressToEdit.isDefault
      };
      
      setNewAddress(editAddress);
      
      const districts = getDistrictsByProvince(editAddress.province);
      setDistrictOptions(districts);
      
      const subdistricts = getSubdistrictsByDistrict(editAddress.district);
      setSubdistrictOptions(subdistricts);
      
      setEditingAddressId(id);
      setShowEditModal(true);
    }
  };

  const handleDeleteAddress = (id: number): void => {
    setDeleteAddressId(id);
    setShowDeleteConfirm(true);
  };
  
  const confirmDeleteAddress = (): void => {
    if (deleteAddressId !== null) {
      const deletingDefault = addresses.find(address => address.id === deleteAddressId)?.isDefault;
      
      const updatedAddresses = addresses.filter(address => address.id !== deleteAddressId);
      
      if (deletingDefault && updatedAddresses.length > 0) {
        updatedAddresses[0].isDefault = true;
        setSelectedAddress(updatedAddresses[0].id);
      }
      
      setAddresses(updatedAddresses);
      setShowDeleteConfirm(false);
      setSuccessMessage('ลบที่อยู่สำเร็จ');
      setShowSuccessAlert(true);
      
      setTimeout(() => {
        setShowSuccessAlert(false);
      }, 3000);
    }
  };
  
  const handleCloseModal = (): void => {
    setShowAddModal(false);
    setShowEditModal(false);
    setNewAddress({
      name: '',
      phone: '',
      addressType: 'home',
      houseNumber: '',
      village: '',
      soi: '',
      road: '',
      subdistrict: '',
      district: '',
      province: '',
      postalCode: '',
      isDefault: false
    });
    setEditingAddressId(null);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>): void => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setNewAddress({
      ...newAddress,
      [name]: type === 'checkbox' ? checked : value
    });
  };
  
  const handleSaveAddress = (): void => {
    const maxId = addresses.reduce((max, address) => Math.max(max, address.id), 0);
    
    const fullAddress = `${newAddress.houseNumber}${newAddress.village ? ' หมู่บ้าน' + newAddress.village : ''}${newAddress.soi ? ' ซอย' + newAddress.soi : ''}${newAddress.road ? ' ถนน' + newAddress.road : ''} ${newAddress.subdistrict} ${newAddress.district} ${newAddress.province} ${newAddress.postalCode}`;
    
    const newAddressData: AddressType = {
      id: maxId + 1,
      recipientName: newAddress.name,
      phone: `(+66) ${newAddress.phone}`,
      addressType: newAddress.addressType,
      addressDetail: fullAddress,
      houseNumber: newAddress.houseNumber,
      village: newAddress.village,
      soi: newAddress.soi,
      road: newAddress.road,
      subdistrict: newAddress.subdistrict,
      district: newAddress.district,
      province: newAddress.province,
      postalCode: newAddress.postalCode,
      isDefault: newAddress.isDefault
    };
    
    let updatedAddresses = [...addresses];
    
    if (newAddress.isDefault) {
      updatedAddresses = updatedAddresses.map(address => ({
        ...address,
        isDefault: false
      }));
      setSelectedAddress(newAddressData.id);
    }
    
    setAddresses([...updatedAddresses, newAddressData]);
    setSuccessMessage('เพิ่มที่อยู่สำเร็จ');
    setShowSuccessAlert(true);
    handleCloseModal();
    
    setTimeout(() => {
      setShowSuccessAlert(false);
    }, 3000);
  };
  
  const handleUpdateAddress = (): void => {
    if (editingAddressId !== null) {
      const fullAddress = `${newAddress.houseNumber}${newAddress.village ? ' หมู่บ้าน' + newAddress.village : ''}${newAddress.soi ? ' ซอย' + newAddress.soi : ''}${newAddress.road ? ' ถนน' + newAddress.road : ''} ${newAddress.subdistrict} ${newAddress.district} ${newAddress.province} ${newAddress.postalCode}`;
      
      const updatedAddresses = addresses.map(address => {
        if (address.id === editingAddressId) {
          return {
            ...address,
            recipientName: newAddress.name,
            phone: `(+66) ${newAddress.phone}`,
            addressType: newAddress.addressType,
            addressDetail: fullAddress,
            houseNumber: newAddress.houseNumber,
            village: newAddress.village,
            soi: newAddress.soi,
            road: newAddress.road,
            subdistrict: newAddress.subdistrict,
            district: newAddress.district,
            province: newAddress.province,
            postalCode: newAddress.postalCode,
            isDefault: newAddress.isDefault
          };
        }
        
        if (newAddress.isDefault && address.id !== editingAddressId) {
          return {
            ...address,
            isDefault: false
          };
        }
        
        return address;
      });
      
      setAddresses(updatedAddresses);
      
      if (newAddress.isDefault) {
        setSelectedAddress(editingAddressId);
      }
      
      setSuccessMessage('แก้ไขที่อยู่สำเร็จ');
      setShowSuccessAlert(true);
      handleCloseModal();
      
      setTimeout(() => {
        setShowSuccessAlert(false);
      }, 3000);
    }
  };
  
  const getAddressTypeText = (type: string): string => {
    switch (type) {
      case 'home': return 'บ้าน';
      case 'office': return 'ที่ทำงาน';
      case 'other': return 'อื่นๆ';
      default: return 'บ้าน';
    }
  };

  return (
    <div>
        <div className="flex items-center text-gray-600">
          <Link href="/" className="flex items-center gap-2 hover:text-[#B86A4B]">
            <ArrowLeft color="#5F6368" />
            <span>หน้าแรก</span>
          </Link>
          <span className="mx-2">/</span>
          <span className="text-[#D6A985]">จัดการที่อยู่จัดส่ง</span>
        </div>
        <br />
        <div className="flex gap-6">
          <AccountSidebar />
          <div className="flex-1">
            <div className="w-full bg-white rounded shadow-sm p-6">
              <div className="flex items-center pb-4 mb-6 border-b border-gray-100">
                <div className="w-10 h-10 rounded-full bg-[#D6A985] flex items-center justify-center mr-4">
                  <img 
                    src="/images/paw_icon.png" 
                    alt="Paw_icon" 
                  />
                </div>
                <h2 className="text-[28px] font-bold text-[#B86A4B] m-0">จัดการที่อยู่จัดส่ง</h2>
              </div>

              <div className="w-full mb-6">
                <div className="rounded-lg border border-gray-200 p-4">
                    
                <div className="grid grid-cols-12 mb-3">
                <div className="col-span-3 flex items-start text-[#5F6368] pl-14 text-[16px]">ชื่อผู้รับ</div>
                <div className="col-span-2 text-[#5F6368] text-[16px]">ประเภทที่อยู่อาศัย</div>
                <div className="col-span-5 text-[#5F6368] text-[16px]">ที่อยู่จัดส่ง</div>
                </div>

                {addresses.map((address) => (
                  <div key={address.id} className="grid grid-cols-12 items-center mb-4">
                    <div className="col-span-3 flex items-start">
                      <label className="inline-flex items-center">
                          <input 
                          type="radio" 
                          name="selectedAddress" 
                          checked={selectedAddress === address.id} 
                          onChange={() => handleRadioSelect(address.id)}
                          className="sr-only"
                          />
                          <div className="relative mr-3">
                          <div className={`w-5 h-5 rounded-full border-2 ${selectedAddress === address.id ? 'border-[#A6A6A6]' : 'border-gray-300'}`}>
                              {selectedAddress === address.id && (
                              <div className="text-[16px] w-3 h-3 rounded-full bg-[#A6A6A6] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                              )}
                          </div>
                          </div>
                          <div className="text-[#5F6368]">
                          <div>{address.recipientName}</div>
                          <div>{address.phone}</div>
                          </div>
                      </label>
                    </div>
                    
                    <div className="col-span-2 flex items-center gap-2">
                      <span className="text-[#5F6368]">{getAddressTypeText(address.addressType)}</span>
                      {address.isDefault && (
                        <span className="px-4 py-1 bg-[#D6A985] text-white rounded-full text-[16px]">
                          ที่อยู่ปัจจุบัน
                        </span>
                      )}
                    </div>

                    <div className="col-span-5 text-[#5F6368]">
                      {address.addressDetail}
                    </div>
                    
                    <div className="col-span-2 text-right">
                      <div className="flex flex-col items-end">
                        <button 
                          onClick={() => handleEditAddress(address.id)}
                          className="text-[#D6A985] hover:text-[#B86A4B] text-[16px] mb-1"
                        >
                          แก้ไขที่อยู่
                        </button>
                        <button 
                          onClick={() => handleDeleteAddress(address.id)}
                          className="text-[#D6A985] hover:text-[#B86A4B] text-[16px]"
                        >
                          ลบที่อยู่
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                </div>
                <div className="mt-4 w-[180px] h-[50px]">
                  <button 
                    onClick={handleAddAddress}
                    className="flex items-center px-4 py-2 border border-[#D6A985] text-[#D6A985] font-bold text-[18px] rounded-lg hover:bg-[#F5E1CF] transition-colors"
                  >
                    <Plus size={18} className="mr-2" />
                    <span>เพิ่มที่อยู่ใหม่</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {(showAddModal || showEditModal) && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-auto py-6">
            <div className="bg-white rounded-[10px] w-full max-w-2xl p-6 relative mx-auto my-4 max-h-[90vh] overflow-y-auto">
              <button 
                onClick={handleCloseModal} 
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
              
              <div className="mb-6">
                <h2 className="text-[32px] font-bold text-[#B86A4B] border-b-2 border-[#D6A985] pb-2">
                  {showAddModal ? 'เพิ่มที่อยู่จัดส่งใหม่' : 'แก้ไขที่อยู่จัดส่ง'}
                </h2>
              </div>
              
              <div className="mb-6">
                <p className="text-lg font-medium mb-2 text-[#5F6368]">ประเภทที่อยู่อาศัย</p>
                <div className="flex gap-6">
                  <label className="flex items-center cursor-pointer">
                    <input 
                      type="radio" 
                      name="addressType" 
                      value="home" 
                      checked={newAddress.addressType === 'home'} 
                      onChange={() => setNewAddress({...newAddress, addressType: 'home'})}
                      className="sr-only"
                    />
                    <div className="relative mr-3">
                      <div className={`w-5 h-5 rounded-full border-2 ${newAddress.addressType === 'home' ? 'border-[#A6A6A6]' : 'border-gray-300'}`}>
                        {newAddress.addressType === 'home' && (
                          <div className="w-3 h-3 rounded-full bg-[#A6A6A6] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                        )}
                      </div>
                    </div>
                    <span className="text-[#5F6368]">บ้าน</span>
                  </label>
                  
                  <label className="flex items-center cursor-pointer">
                    <input 
                      type="radio" 
                      name="addressType" 
                      value="office" 
                      checked={newAddress.addressType === 'office'} 
                      onChange={() => setNewAddress({...newAddress, addressType: 'office'})}
                      className="sr-only"
                    />
                    <div className="relative mr-3">
                      <div className={`w-5 h-5 rounded-full border-2 ${newAddress.addressType === 'office' ? 'border-[#A6A6A6]' : 'border-gray-300'}`}>
                        {newAddress.addressType === 'office' && (
                          <div className="w-3 h-3 rounded-full bg-[#A6A6A6] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                        )}
                      </div>
                    </div>
                    <span className="text-[#5F6368]">ที่ทำงาน</span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input 
                      type="radio" 
                      name="addressType" 
                      value="other" 
                      checked={newAddress.addressType === 'other'} 
                      onChange={() => setNewAddress({...newAddress, addressType: 'other'})}
                      className="sr-only"
                    />
                    <div className="relative mr-3">
                      <div className={`w-5 h-5 rounded-full border-2 ${newAddress.addressType === 'other' ? 'border-[#A6A6A6]' : 'border-gray-300'}`}>
                        {newAddress.addressType === 'other' && (
                          <div className="w-3 h-3 rounded-full bg-[#A6A6A6] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                        )}
                      </div>
                    </div>
                    <span className="text-[#5F6368]">อื่นๆ</span>
                  </label>
                </div>
              </div>
              
              <div className="mb-4">
                <h3 className="font-medium mb-2 text-[#5F6368]">ข้อมูลผู้รับ</h3>
                <div className="mb-4">
                  <label className="block text-[#5F6368] mb-2">ชื่อ - นามสกุล</label>
                  <input 
                    type="text" 
                    name="name"
                    value={newAddress.name}
                    onChange={handleInputChange}
                    placeholder="ชื่อ - นามสกุล" 
                    className={inputClassName}
                  />
                </div>
                
                <div className="mb-4">
                  <label className="block text-[#5F6368] mb-2">หมายเลขโทรศัพท์</label>
                  <div className="flex">
                    <span className="bg-gray-100 px-4 py-2 border border-gray-300 border-r-0 rounded-l text-[16px] text-[#5F6368]">+66</span>
                    <input 
                      type="tel" 
                      name="phone"
                      value={newAddress.phone}
                      onChange={handleInputChange}
                      placeholder="81-123-4567" 
                      className={phoneInputClassName}
                    />
                  </div>
                </div>
              </div>
              
              <div className="mb-4">
                <h3 className="font-medium mb-2 text-[#5F6368]">ที่อยู่จัดส่ง</h3>
                
                <div className="mb-4">
                  <label className="block text-[#5F6368] mb-2">บ้านเลขที่</label>
                  <input 
                    type="text" 
                    name="houseNumber"
                    value={newAddress.houseNumber}
                    onChange={handleInputChange}
                    placeholder="เลขที่/ห้อง" 
                    className={inputClassName}
                  />
                </div>
                
                <div className="mb-4">
                  <label className="block text-[#5F6368] mb-2">หมู่บ้าน/อาคาร (ถ้ามี)</label>
                  <input 
                    type="text" 
                    name="village"
                    value={newAddress.village}
                    onChange={handleInputChange}
                    placeholder="หมู่บ้าน/อาคาร" 
                    className={inputClassName}
                  />
                </div>
                
                <div className="mb-4">
                  <label className="block text-[#5F6368] mb-2">ซอย (ถ้ามี)</label>
                  <input 
                    type="text" 
                    name="soi"
                    value={newAddress.soi}
                    onChange={handleInputChange}
                    placeholder="ซอย" 
                    className={inputClassName}
                  />
                </div>
                
                <div className="mb-4">
                  <label className="block text-[#5F6368] mb-2">ถนน (ถ้ามี)</label>
                  <input 
                    type="text" 
                    name="road"
                    value={newAddress.road}
                    onChange={handleInputChange}
                    placeholder="ถนน" 
                    className={inputClassName}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-[#5F6368] mb-2">รหัสไปรษณีย์</label>
                    <input 
                      type="text"
                      name="postalCode"
                      value={newAddress.postalCode}
                      onChange={handleInputChange}
                      placeholder="รหัสไปรษณีย์ 5 หลัก" 
                      className={inputClassName}
                      readOnly={!!newAddress.subdistrict}
                      title={newAddress.subdistrict ? "รหัสไปรษณีย์จะถูกกำหนดอัตโนมัติเมื่อเลือกตำบล/แขวง" : ""}
                    />
                  </div>
                  <div>
                    <label className="block text-[#5F6368] mb-2">จังหวัด</label>
                    <div className="relative">
                      <select
                        name="province"
                        value={newAddress.province}
                        onChange={handleInputChange}
                        className={selectClassName}
                      >
                        <option value="">เลือกจังหวัด</option>
                        {thaiProvinces.map((province, index) => (
                          <option key={index} value={province}>{province}</option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <ChevronDown size={16} />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-[#5F6368] mb-2">เขต/อำเภอ</label>
                    <div className="relative">
                      <select
                        name="district"
                        value={newAddress.district}
                        onChange={handleInputChange}
                        className={selectClassName}
                        disabled={!newAddress.province}
                      >
                        <option value="">เลือกเขต/อำเภอ</option>
                        {districtOptions.map((district, index) => (
                          <option key={index} value={district}>{district}</option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <ChevronDown size={16} />
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-[#5F6368] mb-2">แขวง/ตำบล</label>
                    <div className="relative">
                      <select
                        name="subdistrict"
                        value={newAddress.subdistrict}
                        onChange={handleInputChange}
                        className={selectClassName}
                        disabled={!newAddress.district}
                      >
                        <option value="">เลือกแขวง/ตำบล</option>
                        {subdistrictOptions.map((subdistrict, index) => (
                          <option key={index} value={subdistrict}>{subdistrict}</option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <ChevronDown size={16} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <label className="flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    name="isDefault"
                    checked={newAddress.isDefault}
                    onChange={handleInputChange}
                    className="sr-only"
                  />
                  <div className="w-4 h-4 border-[2px] border-[#5F6368] mr-3 flex items-center justify-center">
                    {newAddress.isDefault && (
                      <Check size={16} className="text-[#D6A985]" />
                    )}
                  </div>
                  <span className="text-[#5F6368]">ตั้งค่าที่อยู่ปัจจุบัน</span>
                </label>
              </div>
              
              <div className="flex gap-4 justify-end">
                <button 
                  onClick={handleCloseModal}
                  className="w-[180px] h-[50px] border border-gray-300 rounded-[10px] text-[#A6A6A6] hover:bg-gray-100 text-[18px]"
                >
                  ยกเลิก
                </button>
                <button 
                  onClick={showAddModal ? handleSaveAddress : handleUpdateAddress}
                  className="w-[180px] h-[50px] bg-[#D6A985] text-white rounded-[10px] hover:bg-[#c49976] text-[18px]"
                >
                  {showAddModal ? 'ยืนยันที่อยู่จัดส่ง' : 'บันทึกการแก้ไข'}
                </button>
              </div>
            </div>
          </div>
        )}
        
        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-sm mx-auto">
              <h3 className="text-xl font-bold mb-6 text-[#D6A985] text-center">คุณต้องการลบที่อยู่นี้ใช่หรือไม่?</h3>
              <div className="flex justify-end gap-3">
                <button
                  onClick={confirmDeleteAddress}
                  className="px-4 py-2 bg-[#D6A985] text-white rounded w-[200px] h-[40px] text-[18px]"
                >
                  ใช่
                </button>
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="px-4 py-2 border border-[#A6A6A6] rounded text-[#A6A6A6] w-[200px] h-[40px] text-[18px]"
                >
                  ไม่
                </button>
              </div>
            </div>
          </div>
        )}
        
        {showSuccessAlert && (
          <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-md p-4 flex items-center">
            <CheckCircle className="text-green-500 mr-2" />
            <p>{successMessage}</p>
          </div>
        )}
    </div>
  )
}