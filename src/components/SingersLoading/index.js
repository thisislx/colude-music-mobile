import React from 'react'
import { Wrap, Enter, PullUp, PullDown } from './style'
import Toast from '../../baseUI/Toast'

function SingersLoading(props) {
    const { enterLoading, pullUpLoading, pullDownLoading } = props

    return (
        <Wrap>
            {
                pullDownLoading.is ?
                    (<PullDown>
                        <Toast
                            icon={pullDownLoading.icon}
                            mes={pullDownLoading.mes}
                        />
                    </PullDown>) : null
            }
            
            {
                enterLoading.is ?
                    (
                        <Enter>
                            <Toast
                                icon={enterLoading.icon}
                                mes={enterLoading.mes}
                            />
                        </Enter>
                    ) : null
            }

            {
                pullUpLoading.is ?
                    (
                        <PullUp>
                            <Toast
                                icon={pullUpLoading.icon}
                                mes={pullUpLoading.mes}
                            />
                        </PullUp>
                    ) : null
            }
        </Wrap>
    )
}

SingersLoading.defaultProps = {
    enterLoading: {},
    pullUpLoading: {},
    pullDownLoading: {}
}


export default React.memo(SingersLoading)