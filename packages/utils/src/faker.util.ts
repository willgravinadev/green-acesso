export const fakerUtil = {
  condominiumLot: {
    name: (): string => {
      const MIN_LOT_NUMBER = 1
      const MAX_LOT_NUMBER = 1000
      const LOT_NUMBER_PADDING = 4
      const lotNumber =
        Math.floor(Math.random() * (MAX_LOT_NUMBER - MIN_LOT_NUMBER + 1)) + MIN_LOT_NUMBER
      return lotNumber.toString().padStart(LOT_NUMBER_PADDING, '0')
    }
  }
}
