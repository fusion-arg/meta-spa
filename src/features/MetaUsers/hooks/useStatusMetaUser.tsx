import { useConfirm } from 'material-ui-confirm'
import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { type MetaUser } from 'MetaUsers/types'
import config from 'config'
import useFetch from 'hooks/useFetch'

export interface UseMetaUserDeleteResult {
  onClickOpenConfirmStatus: (metaUser: MetaUser) => void
}

export default function useStatusMetaUser(refresh: () => void): UseMetaUserDeleteResult {
  const { t } = useTranslation('features', { keyPrefix: 'MetaUsers' })
  const confirm = useConfirm()
  const { doFetch } = useFetch()

  const onClickOpenConfirmStatus = useCallback(
    (metaUser: MetaUser) => {
      const { status, id } = metaUser

      const action = status === 'active' ? 'deactivate' : 'activate'

      const urlDeactivate = `${config.api.msAuth.baseUrl}/meta-users/${id}/status/deactivate`
      const urlActivate = `${config.api.msAuth.baseUrl}/meta-users/${id}/status/activate`

      const urlApi = status === 'active' ? urlDeactivate : urlActivate

      confirm({
        title: t('dialog.title', { action: t(`dialog.${action}`) }),
        content: t('dialog.content', { action: t(`dialog.${action}`) }),
        confirmationText: t(`dialog.${action}`),
        cancellationText: t('dialog.cancel'),
        cancellationButtonProps: { variant: 'outlined', sx: { mr: '5px' } },
      })
        .then(() => {
          void doFetch({
            method: 'POST',
            url: urlApi,
          }).then(refresh)
        })
        .catch(() => {
          console.log('cancel', null)
        })
    },
    [t, confirm, doFetch, refresh]
  )

  return { onClickOpenConfirmStatus }
}
