import { Flex } from '@chakra-ui/react';
import React from 'react';

type PageContentProps = {

};

const PageContent: React.FC<PageContentProps> = ({ children }) => {

    return (
        <Flex
            border="1px solid red"
            justify="center"
            p="16px 0"
        >
            <Flex
                border="1px solid green"
                width="95%"
                maxWidth="860px"
                justify="center"
            >
                {/* Left Hand Side */}
                <Flex
                    border="1px solid blue"
                    direction="column"
                    width={{ base: "100%", md: "65%" }}
                    mr={{ base: 0, md: 6 }}
                >
                    {children && children[0 as keyof typeof children]}
                </Flex>

                {/* Right Hand Side */}
                <Flex
                    border="1px solid blue"
                    direction="column"
                    display={{ base: "none", md: "flex" }}
                    flexGrow={1}
                >
                    {children && children[1 as keyof typeof children]}
                </Flex>
            </Flex>
        </Flex>
    )
}
export default PageContent;