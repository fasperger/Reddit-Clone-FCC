import { firestore } from '@/firebase/clientApp';
import { doc, getDoc } from 'firebase/firestore';
import { GetServerSideProps } from 'next';
import { GetServerSidePropsContext } from 'next/types';
import React from 'react';
import { Community } from '@/atoms/communitiesAtom';
import safeJsonStringify from 'safe-json-stringify';
import NotFound from '@/components/Community/NotFound';
import Header from '../../../components/Community/Header';
import PageContent from "../../../components/Layout/PageContent";

type CommunityPageProps = {
    communityData: Community;
};

const CommunityPage: React.FC<CommunityPageProps> = ({ communityData }) => {

    if (!communityData) {
        return (
            <NotFound />
        )
    }
    return (
        <>
            <Header communityData={communityData} />
            <PageContent>
                <>LHS</>
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