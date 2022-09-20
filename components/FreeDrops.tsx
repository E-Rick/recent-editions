
// Components
import { NFTCard } from '../components/NFTCard';
import { InView } from 'react-intersection-observer';
import { Box, Grid } from '@zoralabs/zord';

// Query
import { GET_FREE_DROPS } from '../gql/queries'

// Utils
// import { getOrderBy } from 'utils/subgraph';

// Hooks
import { feedWrapper } from 'styles/styles.css';
import { DropList, useInfiniteScroll } from '../hooks/useInfiniteScroll';
import FullWidthSpinner from './FullWidthSpinner';

const FreeDrops = ({ filter, sorting }) => {

  const { data, error, handleLoadMore } = useInfiniteScroll<DropList>(GET_FREE_DROPS)
  return (
    <>
      {
        !data ? (
          <FullWidthSpinner />
        ) :
          (
            <Box className={feedWrapper}>
              <Grid
                wrap='wrap'
                px='x16'
                gap='x6'
                columns="repeat(auto-fill, minmax(240px, 1fr))"
              >
                {
                  data.map((page) => {
                    //  data is an array of each page's api response
                    return page.erc721Drops.map(({ name, address, owner, symbol, editionMetadata, salesConfig, maxSupply }) => {
                      if (editionMetadata != null)
                        return (
                          <Box
                            key={`${editionMetadata.imageURI}-${name}`}
                          >
                            <NFTCard
                              editionMetadata={editionMetadata}
                              symbol={symbol}
                              name={name}
                              address={address}
                              publicSalePrice={
                                salesConfig.publicSalePrice
                              }
                              owner={owner}
                              maxSupply={maxSupply}
                              publicSaleEnd={salesConfig.publicSaleEnd}
                            />
                          </Box>
                        );
                    })
                  })
                }
                <InView
                  onChange={(inView) => {
                    if (inView) handleLoadMore()
                  }}
                />
              </Grid>
            </Box>
          )
      }
    </>
  );
}

export default FreeDrops