'use client'

import React from 'react'
import Link from 'next/link';

export default function ReturnPolicyPage(): React.ReactElement {
  return (
    <div className="container mx-auto px-4 py-6">
      
      <div className="flex gap-6">
        <div className="flex-1">
          <div className="w-full bg-white rounded shadow-sm p-6">
            <div className="flex items-center pb-4 mb-6 border-b border-[#D6A985]">
              <div className="w-10 h-10 rounded-full bg-[#D6A985] flex items-center justify-center mr-4">
                <img 
                  src="/images/paw_icon.png" 
                  alt="Paw icon" 
                />
              </div>
              <h2 className="text-[28px] font-bold text-[#B86A4B] m-0">นโยบายการเปลี่ยน/คืนสินค้า</h2>
            </div>

            <div className="text-[#5F6368] space-y-2">
              <p className="text-[18px]">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
              </p>
              
              <div className="space-y-2">
                <ol className="list-decimal list-inside pl-4 space-y-2 text-[18px]">
                  <li>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</li>
                  <li>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</li>
                  <li>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</li>
                  <li>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</li>
                  <li>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</li>
                  <li>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</li>
                </ol>
              </div>
              
              <p className="text-[18px]">
                It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
              </p>
              
              <div className="space-y-2">
                <p className="text-[18px]">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.</p>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}