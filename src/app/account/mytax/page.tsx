'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link';
import { ArrowLeft, X, CheckCircle, ChevronDown, Check, Circle } from 'lucide-react'
import AccountSidebar from '../component/sidebar';
import { invoicesData, provinces, districts, subdistricts, postalCodes } from './mockdata';

interface PostalCodes {
  [district: string]: {
    [subdistrict: string]: string;
  };
}

interface Districts {
  [province: string]: string[];
}

interface Subdistricts {
  [district: string]: string[];
}

interface Invoice {
  id: number;
  name: string;
  companyName?: string;
  branch?: string;
  phone: string;
  email: string;
  taxId: string;
  taxType: 'personal' | 'corporate';
  address: string;
  addressType: string;
  district?: string;
  subdistrict?: string;
  province?: string;
  postalCode?: string;
  isDefault: boolean;
  isShippingAddress: boolean;
}

export default function Page() {
  const inputClassName = "w-full px-4 py-2 border border-gray-300 rounded text-[16px] text-[#5F6368]";
  const phoneInputClassName = "flex-1 px-4 py-2 border border-gray-300 rounded-r text-[16px] text-[#5F6368]";
  const selectClassName = "w-full px-4 py-2 border border-gray-300 rounded text-[16px] text-[#5F6368] appearance-none bg-white cursor-pointer";
  
  const [invoices, setInvoices] = useState<Invoice[]>(invoicesData);
  const [selectedInvoice, setSelectedInvoice] = useState<number>(1);
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<boolean>(false);
  const [showSuccessNotification, setShowSuccessNotification] = useState<boolean>(false);
  const [notificationMessage, setNotificationMessage] = useState<string>("");
  const [taxType, setTaxType] = useState<'personal' | 'corporate'>('personal');
  const [currentInvoiceId, setCurrentInvoiceId] = useState<number | null>(null);
  
  const [selectedProvince, setSelectedProvince] = useState<string>("");
  const [selectedDistrict, setSelectedDistrict] = useState<string>("");
  const [availableDistricts, setAvailableDistricts] = useState<string[]>([]);
  const [availableSubdistricts, setAvailableSubdistricts] = useState<string[]>([]);
  
  const [newInvoice, setNewInvoice] = useState({
    name: '',
    phone: '',
    email: '',
    taxId: '',
    companyName: '',
    branch: '',
    address: '',
    subdistrict: '',
    district: '',
    province: '',
    postalCode: '',
    addressType: 'บ้าน',
    isDefault: false,
    isShippingAddress: false,
  });

  const hasPostalCode = () => {
    try {
      if (!selectedDistrict || !newInvoice.subdistrict) return false;
      
      const districtPostalCodes = (postalCodes as PostalCodes)[selectedDistrict];
      if (!districtPostalCodes) return false;
      
      return Boolean(districtPostalCodes[newInvoice.subdistrict]);
    } catch (error) {
      return false;
    }
  };

  useEffect(() => {
    if (selectedProvince && (districts as Districts)[selectedProvince]) {
      setAvailableDistricts((districts as Districts)[selectedProvince]);
      setSelectedDistrict("");
      setAvailableSubdistricts([]);
    } else {
      setAvailableDistricts([]);
    }
  }, [selectedProvince]);

  useEffect(() => {
    if (selectedDistrict && (subdistricts as Subdistricts)[selectedDistrict]) {
      setAvailableSubdistricts((subdistricts as Subdistricts)[selectedDistrict]);
    } else {
      setAvailableSubdistricts([]);
    }
  }, [selectedDistrict]);
  
  useEffect(() => {
    if (selectedDistrict && newInvoice.subdistrict) {
      if (selectedDistrict in postalCodes) {
        const districtPostalCodes = (postalCodes as PostalCodes)[selectedDistrict];
        
        if (districtPostalCodes && newInvoice.subdistrict in districtPostalCodes) {
          const postalCode = districtPostalCodes[newInvoice.subdistrict];
          
          setNewInvoice(prev => ({
            ...prev,
            postalCode: postalCode
          }));
        }
      }
    }
  }, [selectedDistrict, newInvoice.subdistrict]);

  const handleRadioSelect = (id: number) => {
    setSelectedInvoice(id);
    
    setInvoices(invoices.map(invoice => ({
      ...invoice,
      isDefault: invoice.id === id
    })));

    setNotificationMessage("อัพเดตที่อยู่ปัจจุบันเรียบร้อยแล้ว");
    setShowSuccessNotification(true);
    
    setTimeout(() => {
      setShowSuccessNotification(false);
    }, 3000);
  };

  const handleAddInvoice = () => {
    resetForm();
    setShowAddModal(true);
  };

  const handleEditInvoice = (id: number) => {
    const invoiceToEdit = invoices.find(invoice => invoice.id === id);
    if (invoiceToEdit) {
      setCurrentInvoiceId(id);
      setTaxType(invoiceToEdit.taxType);
      
      setNewInvoice({
        name: invoiceToEdit.name,
        phone: invoiceToEdit.phone,
        email: invoiceToEdit.email,
        taxId: invoiceToEdit.taxId,
        companyName: invoiceToEdit.companyName || '',
        branch: invoiceToEdit.branch || '',
        address: invoiceToEdit.address,
        subdistrict: invoiceToEdit.subdistrict || '',
        district: invoiceToEdit.district || '',
        province: invoiceToEdit.province || '',
        postalCode: invoiceToEdit.postalCode || '',
        addressType: invoiceToEdit.addressType,
        isDefault: invoiceToEdit.isDefault,
        isShippingAddress: invoiceToEdit.isShippingAddress
      });
      
      if (invoiceToEdit.province) {
        setSelectedProvince(invoiceToEdit.province);
      }
      if (invoiceToEdit.district) {
        setSelectedDistrict(invoiceToEdit.district);
      }
      
      setShowEditModal(true);
    }
  };

  const handleDeleteInvoice = (id: number) => {
    setCurrentInvoiceId(id);
    setShowDeleteConfirm(true);
  };
  
  const confirmDeleteInvoice = () => {
    if (currentInvoiceId !== null) {
      const deletingDefault = invoices.find(invoice => invoice.id === currentInvoiceId)?.isDefault;
      
      const updatedInvoices = invoices.filter(invoice => invoice.id !== currentInvoiceId);
      
      if (deletingDefault && updatedInvoices.length > 0) {
        updatedInvoices[0].isDefault = true;
        setSelectedInvoice(updatedInvoices[0].id);
      }
      
      setInvoices(updatedInvoices);
      
      setCurrentInvoiceId(null);
      setShowDeleteConfirm(false);
      
      setNotificationMessage("ลบที่อยู่เรียบร้อยแล้ว");
      setShowSuccessNotification(true);
      
      setTimeout(() => {
        setShowSuccessNotification(false);
      }, 3000);
    }
  };
  
  const handleCloseModal = () => {
    setShowAddModal(false);
    setShowEditModal(false);
    resetForm();
  };
  
  const resetForm = () => {
    setNewInvoice({
      name: '',
      phone: '',
      email: '',
      taxId: '',
      companyName: '',
      branch: '',
      address: '',
      subdistrict: '',
      district: '',
      province: '',
      postalCode: '',
      addressType: 'บ้าน',
      isDefault: false,
      isShippingAddress: false
    });
    setTaxType('personal');
    setCurrentInvoiceId(null);
    setSelectedProvince("");
    setSelectedDistrict("");
    setAvailableDistricts([]);
    setAvailableSubdistricts([]);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setNewInvoice({
      ...newInvoice,
      [name]: type === 'checkbox' ? checked : value
    });
    
    if (name === 'province') {
      setSelectedProvince(value);
      setNewInvoice({
        ...newInvoice,
        province: value,
        district: '',
        subdistrict: '',
        postalCode: ''
      });
    }
    else if (name === 'district') {
      setSelectedDistrict(value);
      setNewInvoice({
        ...newInvoice,
        district: value,
        subdistrict: '',
        postalCode: ''
      });
    }
    else if (name === 'subdistrict') {
      let postalCode = '';
      
      if (selectedDistrict && selectedDistrict in postalCodes && value) {
        const districtCodes = (postalCodes as PostalCodes)[selectedDistrict];
        if (value in districtCodes) {
          postalCode = districtCodes[value];
        }
      }
      
      setNewInvoice({
        ...newInvoice,
        subdistrict: value,
        postalCode: postalCode
      });
    }
  };
  
  const handleSaveInvoice = () => {
    const maxId = Math.max(...invoices.map(invoice => invoice.id), 0);
    const newId = maxId + 1;
    
    const fullAddress = 
      `${newInvoice.address} ${newInvoice.subdistrict ? `แขวง${newInvoice.subdistrict}` : ''} ${newInvoice.district ? `เขต${newInvoice.district}` : ''} ${newInvoice.province || ''} ${newInvoice.postalCode || ''}`.trim();
    
    const newInvoiceData: Invoice = {
      id: newId,
      name: newInvoice.name,
      phone: newInvoice.phone,
      email: newInvoice.email,
      taxId: newInvoice.taxId,
      taxType: taxType,
      address: fullAddress,
      addressType: newInvoice.addressType,
      subdistrict: newInvoice.subdistrict,
      district: newInvoice.district,
      province: newInvoice.province,
      postalCode: newInvoice.postalCode,
      isDefault: newInvoice.isDefault,
      isShippingAddress: newInvoice.isShippingAddress
    };
    
    if (taxType === 'corporate') {
      newInvoiceData.companyName = newInvoice.companyName;
      newInvoiceData.branch = newInvoice.branch;
    }
    
    let updatedInvoices = [...invoices];
    
    if (newInvoice.isDefault) {
      updatedInvoices = updatedInvoices.map(invoice => ({
        ...invoice,
        isDefault: false
      }));
      setSelectedInvoice(newId);
    }
    
    setInvoices([...updatedInvoices, newInvoiceData]);
    
    setNotificationMessage("เพิ่มที่อยู่เรียบร้อยแล้ว");
    setShowSuccessNotification(true);
    
    setTimeout(() => {
      setShowSuccessNotification(false);
    }, 3000);
    
    handleCloseModal();
  };

  const handleUpdateInvoice = () => {
    if (currentInvoiceId !== null) {
      const fullAddress = 
        `${newInvoice.address} ${newInvoice.subdistrict ? `แขวง${newInvoice.subdistrict}` : ''} ${newInvoice.district ? `เขต${newInvoice.district}` : ''} ${newInvoice.province || ''} ${newInvoice.postalCode || ''}`.trim();
      
      setInvoices(invoices.map(invoice => {
        if (invoice.id === currentInvoiceId) {
          const updatedInvoice: Invoice = {
            ...invoice,
            name: newInvoice.name,
            phone: newInvoice.phone,
            email: newInvoice.email,
            taxId: newInvoice.taxId,
            taxType: taxType,
            address: fullAddress,
            addressType: newInvoice.addressType,
            subdistrict: newInvoice.subdistrict,
            district: newInvoice.district,
            province: newInvoice.province,
            postalCode: newInvoice.postalCode,
            isDefault: newInvoice.isDefault,
            isShippingAddress: newInvoice.isShippingAddress
          };
          
          if (taxType === 'corporate') {
            updatedInvoice.companyName = newInvoice.companyName;
            updatedInvoice.branch = newInvoice.branch;
          } else {
            delete updatedInvoice.companyName;
            delete updatedInvoice.branch;
          }
          
          if (newInvoice.isDefault) {
            setSelectedInvoice(currentInvoiceId);
          }
          
          return updatedInvoice;
        }
        
        if (newInvoice.isDefault && invoice.id !== currentInvoiceId) {
          return {
            ...invoice,
            isDefault: false
          };
        }
        
        return invoice;
      }));
      
      setNotificationMessage("อัพเดตที่อยู่เรียบร้อยแล้ว");
      setShowSuccessNotification(true);
      
      setTimeout(() => {
        setShowSuccessNotification(false);
      }, 3000);
      
      handleCloseModal();
    }
  };

  const handleCheckboxChange = (selected: "isDefault" | "isShippingAddress") => {
    setNewInvoice({
      ...newInvoice,
      isDefault: selected === "isDefault" ? !newInvoice.isDefault : newInvoice.isDefault,
      isShippingAddress: selected === "isShippingAddress" ? !newInvoice.isShippingAddress : newInvoice.isShippingAddress
    });
  };

  return (
    <div className="relative">
        <div className="flex items-center text-gray-600">
          <Link href="/" className="flex items-center gap-2 hover:text-[#B86A4B]">
            <ArrowLeft color="#5F6368" />
            <span>หน้าแรก</span>
          </Link>
          <span className="mx-2">/</span>
          <span className="text-[#D6A985]">จัดการใบกำกับภาษี</span>
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
                <h2 className="text-[28px] font-bold text-[#B86A4B] m-0">จัดการใบกำกับภาษี</h2>
              </div>

              <div className="w-full">
                {invoices.map((invoice) => (
                  <div key={invoice.id} className="py-4 border-b border-gray-100">
                    <div className="grid grid-cols-12 mb-2">
                      <div className="col-span-3 text-[#5F6368] pl-10">
                        {invoice.taxType === 'corporate' ? 'ชื่อบริษัท' : 'ชื่อผู้รับ'}
                      </div>
                      <div className="col-span-3 text-[#5F6368]">ประเภทใบกำกับภาษี</div>
                      <div className="col-span-3 text-[#5F6368]">ประเภทที่อยู่อาศัย</div>
                    </div>
                    
                    <div className="grid grid-cols-12 items-start">
                      <div className="col-span-3 flex items-start">
                        <label className="inline-flex items-start">
                          <input 
                            type="radio" 
                            name="selectedInvoice" 
                            checked={selectedInvoice === invoice.id} 
                            onChange={() => handleRadioSelect(invoice.id)}
                            className="sr-only"
                          />
                          <div className="relative mr-3 mt-1">
                            <div className={`w-5 h-5 rounded-full border-2 ${selectedInvoice === invoice.id ? 'border-[#A6A6A6]' : 'border-gray-300'}`}>
                              {selectedInvoice === invoice.id && (
                                <div className="w-3 h-3 rounded-full bg-[#A6A6A6] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                              )}
                            </div>
                          </div>
                          <div className="text-[#5F6368]">
                            {invoice.taxType === 'corporate' && (
                              <>
                                <div>{invoice.companyName}</div>
                                <div>{invoice.branch}</div>
                              </>
                            )}
                            <div>{invoice.name}</div>
                            <div>{invoice.phone}</div>
                            <div>{invoice.email}</div>
                          </div>
                        </label>
                      </div>
                      
                      <div className="col-span-3">
                        <div className="text-[#5F6368]">
                          <div>
                            {invoice.taxType === 'personal' ? 'ภาษีบุคคลธรรมดา' : 'ภาษีนิติบุคคล'}
                          </div>
                          <div>เลขประจำตัวผู้เสียภาษี</div>
                          <div>{invoice.taxId}</div>
                        </div>
                      </div>
                      
                      <div className="col-span-3">
                        <div className="flex flex-col">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-[#5F6368]">{invoice.addressType}</span>
                            {invoice.isDefault && (
                              <span className="px-3 bg-[#D6A985] text-white rounded-[10px] text-[14px]">
                                ที่อยู่ปัจจุบัน
                              </span>
                            )}
                          </div>
                          <div className="text-[#5F6368]">
                            {invoice.isShippingAddress && <div>ที่อยู่จัดส่ง</div>}
                            <div>{invoice.address}</div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="col-span-3 text-right">
                        <div className="flex flex-col items-end">
                          <button 
                            onClick={() => handleEditInvoice(invoice.id)}
                            className="text-[#D6A985] hover:text-[#B86A4B] text-[16px] mb-1"
                          >
                            แก้ไขที่อยู่
                          </button>
                          <button 
                            onClick={() => handleDeleteInvoice(invoice.id)}
                            className="text-[#D6A985] hover:text-[#B86A4B] text-[16px]"
                          >
                            ลบที่อยู่
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                <div className="mt-6">
                  <button 
                    onClick={handleAddInvoice}
                    className="flex items-center px-4 py-2 border border-[#D6A985] text-[#D6A985] rounded-lg hover:bg-[#F5E1CF] transition-colors text-lg font-medium"
                  >
                    <span className="mr-2 text-xl">+</span>
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
                  {showAddModal ? 'เพิ่มข้อมูลใบกำกับภาษี' : 'แก้ไขข้อมูลใบกำกับภาษี'}
                </h2>
                <div className="text-[#D03D3D] mt-2 text-[18px]">
                  <p>คำเตือน :</p>
                  <p>กรุณาตรวจสอบข้อมูลใบกำกับภาษีให้ถูกต้องทุกครั้ง ทางบริษัทฯ ขอสงวนสิทธิ์ในการแก้ไขใบกำกับภาษี</p>
                  <p>หลังจากคำสั่งซื้อเสร็จสิ้น</p>
                </div>
              </div>
              
              <div className="mb-6">
                <p className="text-lg font-medium mb-2 text-[#5F6368]">ประเภทใบกำกับภาษี</p>
                <div className="flex gap-6">
                  <label className="flex items-center cursor-pointer">
                    <input 
                      type="radio" 
                      name="taxType" 
                      value="personal" 
                      checked={taxType === 'personal'} 
                      onChange={() => setTaxType('personal')}
                      className="sr-only"
                    />
                    <div className="relative mr-3">
                      <div className={`w-5 h-5 rounded-full border-2 ${taxType === 'personal' ? 'border-[#A6A6A6]' : 'border-gray-300'}`}>
                        {taxType === 'personal' && (
                          <Circle className="w-3 h-3 text-[#A6A6A6] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" fill="#A6A6A6" />
                        )}
                      </div>
                    </div>
                    <span className="text-[#5F6368]">ภาษีบุคคลธรรมดา</span>
                  </label>
                  
                  <label className="flex items-center cursor-pointer">
                    <input 
                      type="radio" 
                      name="taxType" 
                      value="corporate" 
                      checked={taxType === 'corporate'} 
                      onChange={() => setTaxType('corporate')}
                      className="sr-only"
                    />
                    <div className="relative mr-3">
                      <div className={`w-5 h-5 rounded-full border-2 ${taxType === 'corporate' ? 'border-[#A6A6A6]' : 'border-gray-300'}`}>
                        {taxType === 'corporate' && (
                          <Circle className="w-3 h-3 text-[#A6A6A6] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" fill="#A6A6A6" />
                        )}
                      </div>
                    </div>
                    <span className="text-[#5F6368]">ภาษีนิติบุคคล</span>
                  </label>
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block text-[#5F6368] mb-2">เลขประจำตัวผู้เสียภาษี</label>
                <input 
                  type="text" 
                  name="taxId"
                  value={newInvoice.taxId}
                  onChange={handleInputChange}
                  placeholder="หมายเลขประจำตัวผู้เสียภาษี (เลขบัตรประชาชน 13 หลัก)" 
                  className={inputClassName}
                />
              </div>
              
              {taxType === 'corporate' && (
                <div className="mb-4">
                  <label className="block text-[#5F6368] mb-2">ชื่อบริษัท</label>
                  <input 
                    type="text" 
                    name="companyName"
                    value={newInvoice.companyName}
                    onChange={handleInputChange}
                    placeholder="ชื่อบริษัท" 
                    className={inputClassName}
                  />
                  
                  <label className="block text-[#5F6368] mt-4 mb-2">สาขา</label>
                  <input 
                    type="text" 
                    name="branch"
                    value={newInvoice.branch}
                    onChange={handleInputChange}
                    placeholder="สาขา (กรุณาระบุเลขสาขา)" 
                    className={inputClassName}
                  />
                </div>
              )}
              <div className="mb-4">
                <h3 className="font-medium mb-2 text-[#5F6368]">ข้อมูลผู้ติดต่อ</h3>
                <div className="mb-4">
                  <label className="block text-[#5F6368] mb-2">ชื่อ - นามสกุล</label>
                  <input 
                    type="text" 
                    name="name"
                    value={newInvoice.name}
                    onChange={handleInputChange}
                    placeholder="ชื่อ - นามสกุล" 
                    className={inputClassName}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-[#5F6368] mb-2">หมายเลขโทรศัพท์</label>
                    <div className="flex">
                      <span className="bg-gray-100 px-4 py-2 border border-gray-300 border-r-0 rounded-l text-[16px] text-[#5F6368]">+66</span>
                      <input 
                        type="tel" 
                        name="phone"
                        value={newInvoice.phone}
                        onChange={handleInputChange}
                        placeholder="81-123-4567" 
                        className={phoneInputClassName}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-[#5F6368] mb-2">อีเมล</label>
                    <input 
                      type="email" 
                      name="email"
                      value={newInvoice.email}
                      onChange={handleInputChange}
                      placeholder="อีเมล" 
                      className={inputClassName}
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-[#5F6368] mb-2">ระบุประเภทที่อยู่</label>
                  <div className="relative">
                    <select
                      name="addressType"
                      value={newInvoice.addressType}
                      onChange={handleInputChange}
                      className={selectClassName}
                    >
                      <option value="บ้าน">บ้าน</option>
                      <option value="ที่ทำงาน">ที่ทำงาน</option>
                      <option value="อื่นๆ">อื่นๆ</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <ChevronDown className="h-4 w-4" />
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-[#5F6368] mb-2">ที่อยู่</label>
                  <input 
                    type="text" 
                    name="address"
                    value={newInvoice.address}
                    onChange={handleInputChange}
                    placeholder="บ้านเลขที่, หมู่บ้าน, ซอย, อาคาร, ถนน" 
                    className={inputClassName}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-[#5F6368] mb-2">รหัสไปรษณีย์</label>
                    <input 
                      type="text" 
                      name="postalCode"
                      value={newInvoice.postalCode}
                      onChange={handleInputChange}
                      placeholder="รหัสไปรษณีย์ 5 หลัก" 
                      className={inputClassName}
                      readOnly={hasPostalCode()}
                    />
                  </div>
                  <div>
                    <label className="block text-[#5F6368] mb-2">จังหวัด</label>
                    <div className="relative">
                      <select
                        name="province"
                        value={newInvoice.province}
                        onChange={handleInputChange}
                        className={selectClassName}
                      >
                        <option value="">เลือกจังหวัด</option>
                        {provinces.map((province, index) => (
                          <option key={index} value={province}>{province}</option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <ChevronDown className="h-4 w-4" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-[#5F6368] mb-2">อำเภอ/เขต</label>
                    <div className="relative">
                      <select
                        name="district"
                        value={newInvoice.district}
                        onChange={handleInputChange}
                        className={selectClassName}
                        disabled={!selectedProvince}
                      >
                        <option value="">เลือกอำเภอ/เขต</option>
                        {availableDistricts.map((district, index) => (
                          <option key={index} value={district}>{district}</option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <ChevronDown className="h-4 w-4" />
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-[#5F6368] mb-2">ตำบล/แขวง</label>
                    <div className="relative">
                      <select
                        name="subdistrict"
                        value={newInvoice.subdistrict}
                        onChange={handleInputChange}
                        className={selectClassName}
                        disabled={!selectedDistrict}
                      >
                        <option value="">เลือกตำบล/แขวง</option>
                        {availableSubdistricts.map((subdistrict, index) => (
                          <option key={index} value={subdistrict}>{subdistrict}</option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <ChevronDown className="h-4 w-4" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <label className="flex items-center mb-3 cursor-pointer">
                  <input 
                    type="checkbox" 
                    name="isDefault"
                    checked={newInvoice.isDefault}
                    onChange={() => handleCheckboxChange("isDefault")}
                    className="sr-only"
                  />
                  <div className="w-4 h-4 border-[2px] border-[#5F6368] mr-3 flex items-center justify-center">
                    {newInvoice.isDefault && (
                      <Check className="h-4 w-4 text-[#D6A985]" strokeWidth={2} />
                    )}
                  </div>
                  <span className="text-[#5F6368]">ตั้งเป็นที่อยู่ปัจจุบัน</span>
                </label>

                <label className="flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    name="isShippingAddress"
                    checked={newInvoice.isShippingAddress}
                    onChange={() => handleCheckboxChange("isShippingAddress")}
                    className="sr-only"
                  />
                  <div className="w-4 h-4 border-[2px] border-[#5F6368] mr-3 flex items-center justify-center">
                    {newInvoice.isShippingAddress && (
                      <Check className="h-4 w-4 text-[#D6A985]" strokeWidth={2} />
                    )}
                  </div>
                  <span className="text-[#5F6368]">ใช้เป็นที่อยู่จัดส่ง</span>
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
                  onClick={showAddModal ? handleSaveInvoice : handleUpdateInvoice}
                  className="w-[180px] h-[50px] bg-[#D6A985] text-white rounded-[10px] hover:bg-[#c49976] text-[18px]"
                >
                  {showAddModal ? 'ยืนยันที่อยู่' : 'อัพเดตที่อยู่'}
                </button>
              </div>
            </div>
          </div>
        )}

        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-[10px] w-full max-w-md p-6 relative">
              <h3 className="text-[24px] font-bold text-[#D6A985] mb-6 text-center">คุณต้องการลบที่อยู่นี้ใช่หรือไม่</h3>
              
              <div className="flex gap-4 justify-end">
                <button 
                  onClick={confirmDeleteInvoice}
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

        {showSuccessNotification && (
          <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-md p-4 flex items-center">
            <CheckCircle className="text-green-500 mr-2" />
            <span>{notificationMessage}</span>
          </div>
        )}
    </div>
  )
}