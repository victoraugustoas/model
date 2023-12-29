import { AssetDailyShare } from "../../src/portfolio_model/asset_daily_share";

test("should create a new asset daily share", () => {
  const assetShare = new AssetDailyShare({
    date: new Date(2000, 1, 1),
    shareValue: 100.2,
  });

  expect(assetShare.date).toEqual(new Date(2000, 1, 1));
  expect(assetShare.shareValue).toEqual(100.2);
});

test("should throw error create with negative share value", () => {
  expect(
    () =>
      new AssetDailyShare({
        date: new Date(2000, 1, 1),
        shareValue: -100.2,
      })
  ).toThrow(new Error("asset_daily_share_negative"));
});
