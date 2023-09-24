
export interface SchipholApiResponse {
    flights: Flight[];
}

export interface RouteType {
    destinations?: string[];
    /** @description S (Schengen), E (Europe) or N (non-Europe) */
    eu?: string;
    /** @description Indicates if a visum is required for destination */
    visa?: boolean;
}

export interface CheckinClassType {
    code?: string;
    description?: string;
}

export interface DeskType {
    checkinClass?: CheckinClassType;
    /** Format: int64 */
    position?: number;
}

export interface   RowType {
    position?: string;
    desks?: DeskType[];
}

export interface CheckinAllocationType {
        /** Format: date-time */
        endTime?: string;
        rows?: RowType[];
        /** Format: date-time */
        startTime?: string;
}

export interface CheckinAllocationsType {
    checkinAllocations?:CheckinAllocationType[];
    remarks?: string[];
}

export interface  AircraftTypeType {
    iataMain?: string;
    iataSub?: string;
}

export interface Flight {
        /** Format: date-time */
        lastUpdatedAt?: string;
        /**
         * Format: date-time
         * @description yyyy-MM-dd'T'HH:mm:ss.SSSZ
         */
        actualLandingTime?: string;
        /**
         * Format: date-time
         * @description yyyy-MM-dd'T'HH:mm:ss.SSSZ
         */
        actualOffBlockTime?: string;
        aircraftRegistration?: string;
        aircraftType?: AircraftTypeType;
        baggageClaim?: {belts?: string[];}
        checkinAllocations?: CheckinAllocationsType;
        codeshares?: string[];
        /**
         * Format: date-time
         * @description yyyy-MM-dd'T'HH:mm:ss.SSSZ
         */
        estimatedLandingTime?: string;
        /**
         * Format: date-time
         * @description yyyy-MM-dd'T'HH:mm:ss.SSSZ
         */
        expectedTimeBoarding?: string;
        /**
         * Format: date-time
         * @description yyyy-MM-dd'T'HH:mm:ss.SSSZ
         */
        expectedTimeGateClosing?: string;
        /**
         * Format: date-time
         * @description yyyy-MM-dd'T'HH:mm:ss.SSSZ
         */
        expectedTimeGateOpen?: string;
        /**
         * Format: date-time
         * @description yyyy-MM-dd'T'HH:mm:ss.SSSZ
         */
        expectedTimeOnBelt?: string;
        /** @description expected security filter */
        expectedSecurityFilter?: string;
        /** @enum {string} */
        flightDirection?: "A" | "D";
        flightName?: string;
        /** Format: int64 */
        flightNumber?: number;
        gate?: string;
        pier?: string;
        id?: string;
        mainFlight?: string;
        prefixIATA?: string;
        prefixICAO?: string;
        /** Format: int64 */
        airlineCode?: number;
        /**
         * Format: date-time
         * @description yyyy-MM-dd'T'HH:mm:ss.SSSZ
         */
        publicEstimatedOffBlockTime?: string;
        publicFlightState?:{
            flightStates?: string[];
        };
        route?: RouteType;
        /**
         * Format: date-time
         * @description yyyy-MM-dd'T'HH:mm:ss.SSSZ
         */
        scheduleDateTime?: string;
        /** @description yyyy-MM-dd */
        scheduleDate?: string;
        /** @description hh:mm:ss */
        scheduleTime?: string;
        /** @description The service type category of the commercial flight. For example: J = Passenger Line, C=Passenger Charter, F = Freight Line and H = Freight Charter etc. */
        serviceType?: string;
        /** Format: int64 */
        terminal?: number;
            transferPositions?: number[];
        schemaVersion?: string;
}


