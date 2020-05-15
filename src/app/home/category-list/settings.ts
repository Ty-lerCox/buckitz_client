export interface Category {
  id: number;
  title: string;
  img: string;
}

export enum Categories {
  None,
  Cars,
  Boats,
  House,
  Children,
}

export const CategoriesData = [
  {
    id: 1,
    title: 'Add Cars',
    img: '../../../../assets/car.png',
  },
  {
    id: 2,
    title: 'Add Boats',
    img: '../../../../assets/boat.png',
  },
  {
    id: 3,
    title: 'Add House',
    img: '../../../../assets/house.png',
  },
  {
    id: 4,
    title: 'Add Children',
    img: '../../../../assets/children.png',
  },
];
