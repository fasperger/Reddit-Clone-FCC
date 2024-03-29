import { firestore } from '@/firebase/clientApp';
import { doc, getDoc } from 'firebase/firestore';
import { GetServerSideProps } from 'next';
import { GetServerSidePropsContext } from 'next/types';
import React, { useEffect } from 'react';
import { Community, communityState } from '@/atoms/communitiesAtom';
import safeJsonStringify from 'safe-json-stringify';
import NotFound from '@/components/Community/NotFound';
import Header from '../../../components/Community/Header';
import PageContent from "../../../components/Layout/PageContent";
import CreatePostLink from "../../../components/Community/CreatePostLink";
import Posts from '@/components/Posts/Posts';
import { useSetRecoilState } from 'recoil';

type CommunityPageProps = {
    communityData: Community;
};

const CommunityPage: React.FC<CommunityPageProps> = ({ communityData }) => {

    const setCommunityStateValue = useSetRecoilState(communityState)
    if (!communityData) {
        return (
            <NotFound />
        )
    }
    useEffect(() => {
        setCommunityStateValue(prev => ({
            ...prev,
            currentCommunity: communityData,
        }))
    }, []);
    return (
        <>
            <Header communityData={communityData} />
            <PageContent>
                <>
                    <CreatePostLink />
                    <Posts communityData={communityData} />
                </>
                <>RHS</>
            </PageContent>
        </>
    )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    try {
        const communityDocRef = doc(firestore, "communities", context.query.communityId as string);
        const communityDoc = await getDoc(communityDocRef);

        return {
            props: {
                communityData: communityDoc.exists() ? JSON.parse(
                    safeJsonStringify({ id: communityDoc.id, ...communityDoc.data() })
                ) : "",
            },
        };
    } catch (error) {
        console.log("getServerSideProps error", error);
    }
}

export default CommunityPage;