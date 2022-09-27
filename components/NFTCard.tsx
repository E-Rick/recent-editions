import { Box, Eyebrow, Flex, Label, Tag } from '@zoralabs/zord'

import { cardWrapper, imageWrapper, cardTitle, image } from 'styles/styles.css'
import { processImgURI } from 'utils/formatters'

import { Collect } from './Collect'
import Image from 'next/image'
import { OPEN_EDITION_SIZE } from 'utils/constants'

export const NFTCard = ({
  editionMetadata,
  symbol,
  name,
  address,
  publicSalePrice,
  maxSupply,
  publicSaleEnd,
  owner,
  priority,
}) => {
  // const endDate = useMemo(
  //   () => new Date(Number(publicSaleEnd) * 1000),
  //   [publicSaleEnd]
  // )
  const formattedTotalSupplyCount = Intl.NumberFormat('en', {
    notation: 'standard',
  }).format(parseInt(maxSupply))
  return (
    <Box className={cardWrapper}>
      <Box>
        <Box className={imageWrapper}>
          {/* Note: vercels image optimization does dull out some colors but the file savings are tremendous in comparison */}
          {/* Handle case where zora allows user to mint broken media which returns as empty strings "". Could use placeholders here. */}
          {editionMetadata.imageURI !== '' && (
            <Image
              src={processImgURI(editionMetadata.imageURI)}
              alt={name}
              layout='fill'
              sizes='(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw'
              quality={100}
              className={image}
              priority={priority}
            />
          )}
        </Box>
        <Box mx='x3' my='x2' maxW='100%'>
          <Flex justify='space-between' align='center'>
            <Label size='lg' className={cardTitle}>
              {name}
            </Label>
          </Flex>
          <Flex align='center' gap='x2'>
            <Tag
              active={true}
              display='inline-flex'
              style={{ letterSpacing: '.05em', fontWeight: '500' }}
              textTransform='uppercase'
              py='x1'
              px='x1'
              fontSize='12px'
              justifySelf='center'
              alignSelf='center'
            >
              ${symbol}
            </Tag>
            <Eyebrow>
              {maxSupply > OPEN_EDITION_SIZE ? 'Open Edition' : `Edition of ${formattedTotalSupplyCount}`}
            </Eyebrow>
          </Flex>
          {/* <Text variant="paragraph-sm" align="right">
            {endDate.toLocaleString(...dateOptions)}
          </Text>
          <CountdownTimer refresh targetTime={publicSaleEnd} prependText='Time Left: ' /> */}
          <Collect address={address} publicSalePrice={publicSalePrice} symbol={symbol} />
        </Box>
      </Box>
    </Box>
  )
}
