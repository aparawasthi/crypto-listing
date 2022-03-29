import Container from '@components/Container/Container';
import { currencyFormatter } from '@pages/Home/Home';
import { getData } from '@utils/api';
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router';
import { CryptoCoin } from 'src/interface/CryptoCoin';
import './CryptoCoin.scss';

interface keyable {
  [key: string]: any;
}

function CryptoCoin() {
  const [assetId, setAssetId] = useState('');
  const location = useLocation<keyable>();
  const [cryptoCoin, setCryptoCoin] = useState<CryptoCoin | null>(null);

  useEffect(() => {
    const { asset_id } = location.state;
    setAssetId(asset_id);
  }, [location]);

  useEffect(() => {
    (async function () {
      if (assetId) {
        console.log(`https://rest.coinapi.io/v1/assets/${assetId}`);
        const response = await getData(
          `https://rest.coinapi.io/v1/assets/${assetId}`,
          {
            'X-CoinAPI-Key': '5A51827A-4D32-4113-9B59-6A3685DCBD9D',
          }
        );
        let crypto = response[0];
        const price_usd = currencyFormatter(crypto.price_usd, '$');
        if (crypto.id_icon) {
          const image = `https://s3.eu-central-1.amazonaws.com/bbxt-static-icons/type-id/png_512/${crypto.id_icon
            .split('-')
            .join('')}.png`;
          crypto = {
            ...crypto,
            image,
            price_usd,
          };
        }
        setCryptoCoin(crypto);
        console.log('Crypto', crypto);
        // console.log('Crypto Coin', cryptoCoin);
      }
    })();
  }, [assetId]);

  return (
    <Container>
      <div className="crypto-warpper flex container">
        <div className="crypto-info flex flex-align-center">
          <img src={cryptoCoin?.image} alt={cryptoCoin?.name} />
          <div className="fw-bold fs-700">{cryptoCoin?.name}</div>
          <div className="crypto-symbol fw-bold">{cryptoCoin?.asset_id}</div>
        </div>
        <div className="crypto-rates">
          <div className="fw-bold">
            {cryptoCoin?.name} Price ({cryptoCoin?.asset_id})
          </div>
          <div className="fw-bold fs-700">{cryptoCoin?.price_usd}</div>
        </div>
      </div>
    </Container>
  );
}

export default CryptoCoin;
