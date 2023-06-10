import React, { useEffect } from 'react'
import { syncUser } from '../store/UserState'
import { useNavigate } from 'react-router-dom'
import { Avatar } from '@material-ui/core'
import '../styles/MyPage.scss'
import { useRecoilValue } from 'recoil'
import { applyMode, applyDensity, Density, Mode } from '@cloudscape-design/global-styles'
import { TopNavigation } from '@cloudscape-design/components'

applyMode(Mode.Dark)
applyDensity(Density.Comfortable)

export default function MyPage() {
  const navigate = useNavigate()
  const bearerUserState = useRecoilValue(syncUser)

  useEffect(() => {
    if (bearerUserState.user.id === 0) {
      navigate('/login')
    }
  })

  return (
    <div className="my-page">
      <TopNavigation
        identity={{
          href: '#',
          title: 'New World',
          logo: {
            src: 'https://nw.fyui001.com/img/new_world_logo.png',
            alt: 'New Wold Logo',
          },
        }}
        i18nStrings={{
          searchIconAriaLabel: 'Search',
          searchDismissIconAriaLabel: 'Close search',
          overflowMenuTriggerText: 'More',
          overflowMenuTitleText: 'All',
          overflowMenuBackIconAriaLabel: 'Back',
          overflowMenuDismissIconAriaLabel: 'Close menu',
        }}
        utilities={[
          {
            type: 'menu-dropdown',
            text: 'Account',
            description: bearerUserState.user.name,
            iconName: 'user-profile',
            items: [
              {
                id: 'logout',
                text: 'Logout',
              },
            ],
          },
        ]}
      >
        <p>ほげほげ</p>
        <Avatar className="icon" alt="Icon" src={bearerUserState.user.iconUrl} sizes="20" />
        <div className="drug-pie-chart">ログインしまています</div>
      </TopNavigation>
    </div>
  )
}
