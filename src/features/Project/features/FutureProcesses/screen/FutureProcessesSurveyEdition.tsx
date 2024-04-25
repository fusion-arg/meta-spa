import { type FC } from 'react'
import { useTranslation } from 'react-i18next'
import PathBreadcrumbs from 'components/PathBreadcrumbs'
import useProject from 'Project/hooks/useProject'
import { FUTURE_PROCESSES_PATHS } from 'Project/features/FutureProcesses/routes.tsx'
import SurveyEdition from 'Project/features/Surveys/screen/SurveyEdition.tsx'

const FutureProcessesSurveyEdition: FC = () => {
  const { t } = useTranslation('features', { keyPrefix: 'FutureProcesses' })
  const { project } = useProject()

  const futureStatePath = FUTURE_PROCESSES_PATHS.SURVEYS.replace(':projectId', project?.id ?? '')

  const itemsBreadcrumbs = [
    {
      title: t('futureState'),
      path: futureStatePath,
      active: false,
    },
    {
      title: t('surveys.create.title'),
      path: futureStatePath,
      active: true,
    },
  ]

  return (
    <div>
      <PathBreadcrumbs itemsBreadcrumbs={itemsBreadcrumbs} />
      <SurveyEdition module="future_state_process" goBackPath={futureStatePath} />
    </div>
  )
}

export default FutureProcessesSurveyEdition
