// import React from 'react';
// import { View, Text, ScrollView, TouchableOpacity } from 'react-native';

// interface CategoryFilterProps {
//   categories: string[];
//   activeCategory: string;
//   onCategoryPress: (category: string) => void;
// }

// export function CategoryFilter({ categories, activeCategory, onCategoryPress }: CategoryFilterProps) {
//   return (
//     <ScrollView 
//       horizontal 
//       showsHorizontalScrollIndicator={false} 
//       className="py-2 mb-3"
//     >
//       {categories.map((category) => (
//         <TouchableOpacity
//           key={category}
//           onPress={() => onCategoryPress(category)}
//           className={`px-4 py-2 mr-2 rounded-full ${
//             activeCategory === category ? 'bg-blue-500' : 'bg-gray-200'
//           }`}
//         >
//           <Text 
//             className={`${
//               activeCategory === category ? 'text-white' : 'text-gray-800'
//             } font-medium`}
//           >
//             {category.charAt(0).toUpperCase() + category.slice(1)}
//           </Text>
//         </TouchableOpacity>
//       ))}
//     </ScrollView>
//   );
// }