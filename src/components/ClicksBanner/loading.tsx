import { Box, SimpleGrid } from '@chakra-ui/react';
import React from 'react';

export default function Loading() {
  return (
    <Box bg='ED.white' maxW='100%' m='auto' pos='relative'>
      <Box className='primaryContainer' pos='relative'>
        <SimpleGrid
          columns={[3, 3, 6, 6]}
          height={['200px', '200px', '100px', '100px']}
          spacing={['20px', '20px', '120px', '120px']}
          alignItems='center'
          py='11px'
        >
          {Array(6).map((_item: null, index: number) => (
            <Box height='100%' key={`offer-${index}`} pos='relative'>
              <div>loading</div>
            </Box>
          ))}
        </SimpleGrid>
      </Box>
    </Box>
  );
}
