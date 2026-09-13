export interface CustomerItem {
  id: string;
  name: string;
  group?: string;
  location: string;
  category: 'Textile & Garments' | 'Packaging & Flexipack' | 'Jute & Carpet' | 'Agro & Feed Mills' | 'Food & Beverage' | 'Petroleum & Industrial' | 'Ceramics & Building Materials';
}

export const customerList: CustomerItem[] = [
  {
    id: 'c-1',
    name: 'Metro Foils Ltd.',
    group: 'A sister concern of Rangs Group',
    location: 'Ashulia, Savar, Dhaka',
    category: 'Packaging & Flexipack'
  },
  {
    id: 'c-2',
    name: 'Future Clothing Ltd.',
    location: 'Katgora, Ashulia, Savar, Dhaka',
    category: 'Textile & Garments'
  },
  {
    id: 'c-3',
    name: 'Jaycees Apparels and Dying Ltd.',
    location: 'Plot No: 12-B & 12-D, Block-B, Tongi Industrial Area, Tongi, Gazipur',
    category: 'Textile & Garments'
  },
  {
    id: 'c-4',
    name: 'Hossain Clothing Limited',
    location: 'Satarkul Road, Badda, Dhaka',
    category: 'Textile & Garments'
  },
  {
    id: 'c-5',
    name: 'Basumati Oasis Petroleum Industries Ltd.',
    location: 'Beside Tatuljhora Bridge, Hemayetpur, Dhaka',
    category: 'Petroleum & Industrial'
  },
  {
    id: 'c-6',
    name: 'Raka Industries PLC.',
    location: 'Kalir Atpara, Munshigonj, Narayanganj',
    category: 'Petroleum & Industrial'
  },
  {
    id: 'c-7',
    name: 'Neo-Bangla Industries Ltd. (Korea-Bangladesh JV)',
    location: 'Adamjee EPZ, Narayanganj',
    category: 'Petroleum & Industrial'
  },
  {
    id: 'c-8',
    name: 'Uttara Jute Fibers & Industries Ltd.',
    location: 'Mayer Bari, Kanchan, Rupganj, Narayanganj',
    category: 'Jute & Carpet'
  },
  {
    id: 'c-9',
    name: 'RR Marble & Granite Ltd.',
    location: 'Kamlapur, Birulia, Savar, Dhaka',
    category: 'Ceramics & Building Materials'
  },
  {
    id: 'c-10',
    name: 'Meghna Ship Builders Ltd.',
    group: 'A sister concern of Meghna Group',
    location: 'Meghnaghat, Sonargaon, Narayanganj',
    category: 'Petroleum & Industrial'
  },
  {
    id: 'c-11',
    name: 'R. M. Jute Diversified Mills Ltd.',
    group: 'A sister concern of Mamun Group',
    location: 'Shibrampur, Faridpur',
    category: 'Jute & Carpet'
  },
  {
    id: 'c-12',
    name: 'The Rajbari Poultry & Hatcheries Ltd.',
    group: 'A sister concern of Mamun Group',
    location: 'Shibrampur, Faridpur',
    category: 'Agro & Feed Mills'
  },
  {
    id: 'c-13',
    name: 'RM Geotex LTD.',
    group: 'A sister concern of Mamun Group',
    location: 'Shibrampur, Faridpur',
    category: 'Jute & Carpet'
  },
  {
    id: 'c-14',
    name: 'RM Carpet LTD.',
    group: 'A sister concern of Mamun Group',
    location: 'Shibrampur, Faridpur',
    category: 'Jute & Carpet'
  },
  {
    id: 'c-15',
    name: 'Fun Paradise LTD.',
    group: 'A sister concern of Mamun Group',
    location: 'Joydebpur, Shibrampur, Faridpur',
    category: 'Petroleum & Industrial'
  },
  {
    id: 'c-16',
    name: 'Mamun Poultry & Hatcheries Ltd.',
    group: 'A sister concern of Mamun Group',
    location: 'Shibrampur, Faridpur',
    category: 'Agro & Feed Mills'
  },
  {
    id: 'c-17',
    name: 'Alhaz Habib Poultry Hatchery Complex Ltd.',
    location: 'Kathaltala Bazar, Fakirhat, Bagerhat',
    category: 'Agro & Feed Mills'
  },
  {
    id: 'c-18',
    name: 'Samico Apparels Ltd.',
    location: 'Ashulia, Savar, Dhaka',
    category: 'Textile & Garments'
  },
  {
    id: 'c-19',
    name: 'Shah Perfumery Products Ltd.',
    location: 'Moulvibazar',
    category: 'Petroleum & Industrial'
  },
  {
    id: 'c-20',
    name: 'J. N. Auto Rice Mills Ltd.',
    location: 'Naogaon',
    category: 'Agro & Feed Mills'
  },
  {
    id: 'c-21',
    name: 'Jahan Auto Rice Mill Ltd.',
    location: 'Dhamrai, Dhaka',
    category: 'Agro & Feed Mills'
  },
  {
    id: 'c-22',
    name: 'United Auto Rice Mills Ltd.',
    location: 'Sherpur',
    category: 'Agro & Feed Mills'
  },
  {
    id: 'c-23',
    name: 'Biddyut Auto Rice Mills Ltd.',
    location: 'Jamalpur',
    category: 'Agro & Feed Mills'
  },
  {
    id: 'c-24',
    name: 'Tuna Tori Auto Rice Mill',
    location: 'Haldia, Kalihati, Tangail',
    category: 'Agro & Feed Mills'
  },
  {
    id: 'c-25',
    name: 'KDL Auto Rice Mills Ltd.',
    location: 'Shashar Bazar, Guatola, Tarakanda, Mymensingh',
    category: 'Agro & Feed Mills'
  },
  {
    id: 'c-26',
    name: 'Shehab Auto Rice Mills Ltd.',
    location: 'Jhenaidah',
    category: 'Agro & Feed Mills'
  },
  {
    id: 'c-27',
    name: 'Shayon Auto Rice Mills Ltd.',
    location: 'Katakhali, Khulna',
    category: 'Agro & Feed Mills'
  },
  {
    id: 'c-28',
    name: 'Bhola Auto Rice Mills Ltd.',
    location: 'Charfasson, Bhola',
    category: 'Agro & Feed Mills'
  },
  {
    id: 'c-29',
    name: 'Mohua Auto Rice Mills Ltd.',
    location: 'Thakurakona Bazar, Netrokona Sadar, Netrokona',
    category: 'Agro & Feed Mills'
  },
  {
    id: 'c-30',
    name: 'Loknath Feed Mills Ltd.',
    location: 'Gobindoganj, Gaibandha',
    category: 'Agro & Feed Mills'
  },
  {
    id: 'c-31',
    name: 'Allar Darga Agro Complex Ltd.',
    location: 'Bheramara, Kushtia',
    category: 'Agro & Feed Mills'
  },
  {
    id: 'c-32',
    name: 'Jannat Printing & Packaging Ltd.',
    location: 'Rupganj, Narayanganj',
    category: 'Packaging & Flexipack'
  },
  {
    id: 'c-33',
    name: 'Index Accessories Ltd.',
    location: 'Gouripur, Ashulia, Savar, Dhaka',
    category: 'Packaging & Flexipack'
  },
  {
    id: 'c-34',
    name: 'KR Flexipack Ltd.',
    location: 'Sitakunda, Chittagong',
    category: 'Packaging & Flexipack'
  },
  {
    id: 'c-35',
    name: 'Affix Consumer Products Ltd.',
    location: 'Bhaluka, Mymensingh',
    category: 'Food & Beverage'
  },
  {
    id: 'c-36',
    name: 'Ajma Agro Vet Ltd.',
    location: 'Bilmoubhog, Rupsha, Khulna',
    category: 'Agro & Feed Mills'
  },
  {
    id: 'c-37',
    name: 'Badarganj Seeds Ltd.',
    location: 'Bilmoubhog, Rupsha, Khulna',
    category: 'Agro & Feed Mills'
  },
  {
    id: 'c-38',
    name: 'Marvelous Accessories Ltd.',
    location: '725-728, Dighamatia, Dhakkin Shyampur, Hemayetpur, Savar, Dhaka',
    category: 'Packaging & Flexipack'
  },
  {
    id: 'c-39',
    name: 'Rangdhonu Cylinders Ltd.',
    location: 'Dhaur, Turag, Uttara, Dhaka-1230',
    category: 'Petroleum & Industrial'
  },
  {
    id: 'c-40',
    name: 'Excellence Printing & Packaging Ltd.',
    location: 'Barpa, Rupganj, Narayanganj, Dhaka-1000',
    category: 'Packaging & Flexipack'
  },
  {
    id: 'c-41',
    name: 'JAS Rotoflex Limited',
    location: 'Gokulnagor, Chatian, Madhabpur, Habiganj',
    category: 'Packaging & Flexipack'
  },
  {
    id: 'c-42',
    name: 'Radiant Rotogravure Industries Ltd.',
    location: 'Shibpur, Madhabpur, Habiganj',
    category: 'Packaging & Flexipack'
  },
  {
    id: 'c-43',
    name: 'CARE Flexipack Limited',
    location: 'Olipur, Habiganj',
    category: 'Packaging & Flexipack'
  },
  {
    id: 'c-44',
    name: 'Bashundhara Food & Beverage Ltd.',
    group: 'Bashundhara Group',
    location: 'Pangaon, Keraniganj, Dhaka',
    category: 'Food & Beverage'
  },
  {
    id: 'c-45',
    name: 'Jaya Insulation Industries Ltd.',
    location: 'Khulna',
    category: 'Ceramics & Building Materials'
  },
  {
    id: 'c-46',
    name: 'BRAC Printing & Packaging',
    group: 'BRAC Enterprise',
    location: 'Tongi, Gazipur',
    category: 'Packaging & Flexipack'
  },
  {
    id: 'c-47',
    name: 'BRAC Printers & Veg. Pack House',
    group: 'BRAC Enterprise',
    location: 'Tongi, Gazipur',
    category: 'Packaging & Flexipack'
  },
  {
    id: 'c-48',
    name: 'Deshbondhu Flexible Packaging Ltd.',
    location: 'Kaliganj, Gazipur',
    category: 'Packaging & Flexipack'
  },
  {
    id: 'c-49',
    name: 'Joy Flexible Pack Limited',
    location: 'Keraniganj, Dhaka',
    category: 'Packaging & Flexipack'
  },
  {
    id: 'c-50',
    name: 'MONNO Flexipack Limited',
    location: 'Manikganj',
    category: 'Packaging & Flexipack'
  },
  {
    id: 'c-51',
    name: 'Akash Printing & Packaging Ltd.',
    location: 'Muktarpur, Munshiganj',
    category: 'Packaging & Flexipack'
  },
  {
    id: 'c-52',
    name: 'GM Flexipack Limited',
    location: 'Muktarpur, Munshiganj',
    category: 'Packaging & Flexipack'
  },
  {
    id: 'c-53',
    name: 'Hamey Group',
    location: 'Mymensingh Sadar, Mymensingh',
    category: 'Textile & Garments'
  },
  {
    id: 'c-54',
    name: 'Farmland Ceramics Ltd.',
    location: 'Sherpur, Bogura',
    category: 'Ceramics & Building Materials'
  },
  {
    id: 'c-55',
    name: 'Smart Auto Bricks Ltd.',
    location: 'Ghunapara, Kasiani, Gopalganj',
    category: 'Ceramics & Building Materials'
  },
  {
    id: 'c-56',
    name: 'Safe Modern Agro Vet Ltd.',
    location: 'Katakhali Bridge, Fakirhat, Bagerhat',
    category: 'Agro & Feed Mills'
  }
];
