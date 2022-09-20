import {
  Box,
  Eyebrow,
  Flex,
  Label,
  Tag,
} from '@zoralabs/zord';

import {
  cardWrapper,
  imageWrapper,
  cardTitle,
  image,
} from 'styles/styles.css';
import { processImgURI } from 'utils/formatters';

import { Collect } from './Collect';
import Image from 'next/image'

export const NFTCard = ({
  editionMetadata,
  symbol,
  name,
  address,
  publicSalePrice,
  maxSupply,
  publicSaleEnd,
  owner
}) => {

  return (
    <Box className={cardWrapper}>
      <Box>
        <Box className={imageWrapper}>
          {/* Note: vercels image optimization does dull out some colors but the file savings are tremendous in comparison */}
          {/* Handle case where zora allows user to mint broken media which returns as empty strings "". Could use placeholders here. */}
          {editionMetadata.imageURI !== "" &&
            <Image src={processImgURI(editionMetadata.imageURI)} alt={name} layout='fill' className={image} />
          }
        </Box>
        <Box mx='x3' my='x2' maxW='100%'>
          <Flex justify='space-between' align='center'>
            <Label size='lg' className={cardTitle}>
              {name}
            </Label>
          </Flex>
          <Flex align='center' gap='x2'>
            <Tag active={true} display='inline-flex' style={{ letterSpacing: '.05em', fontWeight: '500' }} textTransform='uppercase' py='x1' px='x1' fontSize='12px' justifySelf='center' alignSelf='center'>${symbol}</Tag>
            <Eyebrow>{maxSupply > 100000 ? 'Open Edition' : `Edition of ${maxSupply}`}</Eyebrow>
          </Flex>
          {publicSaleEnd}
          <Collect
            address={address}
            publicSalePrice={publicSalePrice}
            symbol={symbol}
          />
        </Box>
      </Box>
    </Box>
  );
};
