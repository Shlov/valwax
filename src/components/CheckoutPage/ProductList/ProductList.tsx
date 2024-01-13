'use client';
import CartListSkeleton from '@components/components/Skeletons/CartListSkeleton/CartListSkeleton';
import Typography from '@components/components/Typography/Typography';
import { convertToServerLocale } from '@components/helpers/convertToServerLocale';
import { useLangFromPathname, useProductList } from '@components/hooks';
import type {
  configuratorSectionI,
  ProductListDictionary,
} from '@components/types';
import { useCartContext } from '@context/CartContext';

import ProductCard from '../ProductCard/ProductCard';

import styles from './ProductList.module.scss';

interface ProductListProps {
  dict: ProductListDictionary;
  dictParam: configuratorSectionI;
  itemDeleted: string;
}

const ProductList: React.FC<ProductListProps> = ({
  dict: { totalText, deleteButtonText, descriptionPropertyNames },
  dictParam,
  itemDeleted,
}) => {
  const { cartTotalPrice, cartProducts } = useCartContext();
  const lang = useLangFromPathname();
  const currentLang = convertToServerLocale(lang);

  const { products, isLoading, handleDelete } = useProductList({
    cartProducts,
    currentLang,
  });

  return (
    <div>
      {isLoading && <CartListSkeleton />}
      {products.length >= 1 && (
        <>
          <ul className={styles.list}>
            {products.map((product: ICartProduct, index) => (
              <ProductCard
                key={
                  product.slug.includes('boxes')
                    ? `${product.id}${index}`
                    : product.id
                }
                {...product}
                deleteButtonText={deleteButtonText}
                descriptionPropertyNames={descriptionPropertyNames}
                itemDeleted={itemDeleted}
                dictParam={dictParam}
                handleDelete={handleDelete}
              />
            ))}
          </ul>
          <div className={styles.total}>
            <Typography variant="bodyL" color="var(--cl-primary-800)">
              {totalText}
            </Typography>
            <div className={styles.price_container}>
              <Typography variant="bodyXLHeavy" className={styles.price}>
                {cartTotalPrice}
              </Typography>
              <span>&#8372;</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductList;
