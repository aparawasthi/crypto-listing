import Container from '@components/Container/Container';
import Grid from '@components/Grid/Grid';
import { getData } from '@utils/api';
import React, { useState, useMemo, useEffect } from 'react';
import './style/Home.style.scss';
// import { sampleCryptoData } from '../../sampleData';
import { useHistory } from 'react-router';
import { CryptoCoin } from 'src/interface/CryptoCoin';
import { RowClickedEvent } from 'ag-grid-community';

export function currencyFormatter(currency = 0, sign: string) {
  var sansDec = currency.toFixed(2);
  var formatted = sansDec.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return sign + `${formatted}`;
}

function Home() {
  const [cryptoCoins, setCryptoCoins] = useState<CryptoCoin[]>([]);
  const history = useHistory();
  // const [cryptoCoins, setCryptoCoins] = useState<CryptoCoin[]>(() =>
  //   sampleCryptoData()
  // );

  useEffect(() => {
    (async function () {
      const response: CryptoCoin[] = await getData(
        `https://rest.coinapi.io/v1/assets`,
        {
          'X-CoinAPI-Key': '5A51827A-4D32-4113-9B59-6A3685DCBD9D',
        }
      );

      // const cryptoCurr = cryptoCoins;

      const cryptoCurr = response.reduce((acc, currency) => {
        if (currency.type_is_crypto === 1) {
          if (currency.id_icon) {
            const image = `https://s3.eu-central-1.amazonaws.com/bbxt-static-icons/type-id/png_16/${currency.id_icon
              .split('-')
              .join('')}.png`;
            currency = {
              ...currency,
              image,
            };
          }
          acc.push(currency);
        }
        return acc;
      }, [] as CryptoCoin[]);

      setCryptoCoins(cryptoCurr);
    })();
  }, []);

  const CryptoName = ({ data }: any) => (
    <div className="crypto-name-wrapper">
      <div className="crypto-name">{data.name}</div>
      {data.image && <img className="crypto-icon" src={data.image} />}
    </div>
  );

  const columnDefs = useMemo(
    () => [
      {
        headerName: 'Name',
        field: 'name',
        minWidth: 220,
        cellRenderer: CryptoName,
      },
      { headerName: 'Symbol', field: 'asset_id', minWidth: 80 },
      { headerName: 'Market Cap', field: 'data_trade_start' },
      {
        headerName: 'Current Price',
        field: 'price_usd',
        valueFormatter: (params: any) =>
          currencyFormatter(params.data.price_usd, '$'),
        sortable: true,
        type: 'numericColumn',
      },
      {
        headerName: 'Ciruclating Supply',
        field: 'data_trade_start',
        sortable: true,
      },
      { headerName: 'Volume (24h)', field: 'data_trade_start', sortable: true },
      { headerName: '% 1hr', field: 'volume_1hrs_usd', sortable: true },
      { headerName: '% 24hr', field: 'volume_1day_usd', sortable: true },
      { headerName: '% 30 Days', field: 'volume_1mth_usd', sortable: true },
    ],
    []
  );

  const defaultColDef = useMemo(() => ({ flex: 1, minWidth: 150 }), []);

  const onRowClickHandler = (event: RowClickedEvent) => {
    history.push({
      pathname: '/currency',
      state: { asset_id: event.data.asset_id },
    });
  };

  return (
    <>
      <Container>
        <Grid
          gridData={cryptoCoins}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          onRowClick={onRowClickHandler}
        ></Grid>
      </Container>
    </>
  );
}

export default Home;
