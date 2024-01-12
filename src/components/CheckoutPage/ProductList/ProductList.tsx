'use client';
import { useEffect, useState } from 'react';
import Typography from '@components/components/Typography/Typography';
import { convertToServerLocale } from '@components/helpers/convertToServerLocale';
import { useLangFromPathname } from '@components/hooks';
import type {
  CartProductI,
  configuratorSectionI,
  ProductListDictionary,
} from '@components/types';
import { useCartContext } from '@context/CartContext';
import { fetchCartBoxes } from '@lib/api-services/fetchCartBoxes';
import { fetchCartCandles } from '@lib/api-services/fetchCartCandles';

import ProductCard from '../ProductCard/ProductCard';

import styles from './ProductList.module.scss';

interface ProductListProps {
  dict: ProductListDictionary;
  dictParam: configuratorSectionI;
  itemDeleted: string;
}

interface ICartBox extends BoxDetailsI {
  aroma: number;
  quantity: number;
}

interface ICartCandle extends CandleDetailsI {
  quantity: number;
}

type IProduct = ICartCandle | ICartBox | CartProductI;

const ProductList: React.FC<ProductListProps> = ({
  dict: { totalText, deleteButtonText, descriptionPropertyNames },
  dictParam,
  itemDeleted,
}) => {
  const { totalPrice, cartItems, cartProducts } = useCartContext();
  const [products, setProducts] = useState<IProduct[] | []>([
    ...cartProducts.customCandles,
  ]);
  const lang = useLangFromPathname();

  const currentLang = convertToServerLocale(lang);

  useEffect(() => {
    const getCandles = async () => {
      if (cartProducts.candlesIds.length > 0) {
        const data = await fetchCartCandles({
          lang: currentLang,
          ids: cartProducts.candlesIds,
        });

        const modifiedCandles = cartProducts.candles?.map(
          ({ id, quantity }) => {
            const candleData = data.find(item => item.id === id)!;
            return { ...candleData, quantity };
          }
        );
        setProducts(prevProducts => [...prevProducts, ...modifiedCandles]);
      }
    };

    const getBoxes = async () => {
      if (cartProducts.boxesIds.length > 0) {
        const data = await fetchCartBoxes({
          lang: currentLang,
          ids: cartProducts.boxesIds,
        });
        const modifiedBoxes = cartProducts?.boxes.map(
          ({ id, quantity, aroma }) => {
            const boxData = data.find(item => item.id === id)!;
            return { ...boxData, quantity, aroma };
          }
        );

        setProducts(prevProducts => [...prevProducts, ...modifiedBoxes]);
      }
    };

    getCandles();
    getBoxes();
  }, [cartProducts.boxesIds, cartProducts.candlesIds, currentLang]);

  return (
    <div>
      {products.length >= 1 && (
        <>
          <ul className={styles.list}>
            {products.map((product: CartProductI, index) => (
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
              />
            ))}
          </ul>
          <div className={styles.total}>
            <Typography variant="bodyL" color="var(--cl-primary-800)">
              {totalText}
            </Typography>
            <div className={styles.price_container}>
              <Typography variant="bodyXLHeavy" className={styles.price}>
                {totalPrice}
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
