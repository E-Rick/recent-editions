// Components
import { NFTCard } from '../components/NFTCard'
import { InView, useInView } from 'react-intersection-observer'
import { Box, Grid } from '@zoralabs/zord'

// Query
import { GET_FREE_DROPS } from '../gql/queries'

// Utils
// import { getOrderBy } from 'utils/subgraph';

// Hooks
import { feedWrapper } from 'styles/styles.css'
import { DropList, useInfiniteScroll } from '../hooks/useInfiniteScroll'
import FullWidthSpinner from './FullWidthSpinner'
import { useEffect } from 'react'

const Feed = ({ filter, sorting }) => {
  const { ref, inView } = useInView()
  const { data, error, handleLoadMore, loading } = useInfiniteScroll<DropList>(filter)

  useEffect(() => {
    if (inView) {
      handleLoadMore()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView])

  return (
    <>
      {!data ? (
        <FullWidthSpinner />
      ) : (
        <Box className={feedWrapper}>
          <Grid wrap='wrap' px='x16' gap='x6' columns='repeat(auto-fill, minmax(240px, 1fr))'>
            {data.map((page, pageIndex) => {
              //  data is an array of each page's api response
              return page.erc721Drops.map(
                ({ name, address, owner, symbol, editionMetadata, salesConfig, maxSupply }, index) => {
                  if (editionMetadata != null)
                    return (
                      <Box key={`${editionMetadata.imageURI}-${name}`}>
                        <NFTCard
                          editionMetadata={editionMetadata}
                          symbol={symbol}
                          name={name}
                          address={address}
                          publicSalePrice={salesConfig.publicSalePrice}
                          owner={owner}
                          maxSupply={maxSupply}
                          publicSaleEnd={salesConfig.publicSaleEnd}
                          priority={index <= 7 && pageIndex === 0 ? true : false}
                        />
                      </Box>
                    )
                }
              )
            })}
          </Grid>
          <Box ref={ref} onClick={() => handleLoadMore()}>
            <FullWidthSpinner />
          </Box>
        </Box>
      )}
    </>
  )
}

export default Feed
