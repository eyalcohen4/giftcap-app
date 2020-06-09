import React from 'react';
import { View } from 'react-native'
import { useTranslation } from 'react-i18next';

import { Text } from '../components'

type GiftSentProps = {

}

const GiftSent: React.FC<GiftSentProps> = ({}: GiftSentProps) => {
    const { t } = useTranslation()

    return <View>
        <Text>{t("thanks")}</Text>
    </View>
}

export default GiftSent