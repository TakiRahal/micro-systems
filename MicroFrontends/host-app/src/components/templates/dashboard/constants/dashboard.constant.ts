const listOfCards = [
    {
        title: 'Status',
        description: 'Status All MicroServices',
        callback: () => {
            window.open(import.meta.env.VITE_SPRING_EUREKU, '_blank');
        }
    },
    {
        title: 'Prometheus',
        description: 'All query Prometheus',
        callback: () => {
            window.open(import.meta.env.VITE_PROMETHEUS, '_blank');
        }
    },
    {
        title: 'Grafana',
        description: 'All Dashboards in Grafana',
        callback: () => {
            window.open(import.meta.env.VITE_GRAFANA, '_blank');
        }
    },
    {
        title: 'Cache',
        description: 'Redis Cache',
        callback: () => {
            window.open(import.meta.env.VITE_REDIS_CACHE, '_blank');
        }
    }
]


const listSwaggerCards = [
    {
        title: 'Status GateWay',  
        firstTitleLink: 'Actuator monitor GW',
        firstCallback: () => {
            window.open(import.meta.env.VITE_ACTUATOR_GW, '_blank');
        },
        secondeTitleLink: 'Swagger UI',
        secondeCallback: () => {
            window.open(import.meta.env.VITE_ACTUATOR_GW, '_blank');
        },
    },
    {
        title: 'Status User Services',  
        firstTitleLink: 'Actuator monitor US',
        firstCallback: () => {
            window.open(import.meta.env.VITE_ACTUATOR_USER_APP, '_blank');
        },
        secondeTitleLink: 'Swagger UI',
        secondeCallback: () => {
            window.open(import.meta.env.VITE_ACTUATOR_USER_APP, '_blank');
        },
    },
    {
        title: 'Status Offer Services',  
        firstTitleLink: 'Actuator monitor OS',
        firstCallback: () => {
            window.open(import.meta.env.VITE_ACTUATOR_OFFER_APP, '_blank');
        },
        secondeTitleLink: 'Swagger UI',
        secondeCallback: () => {
            window.open(import.meta.env.VITE_ACTUATOR_OFFER_APP, '_blank');
        },
    }
]
export {listOfCards, listSwaggerCards}