import Service from "./Service";

test("gets owner address", () => {
  expect(Service.getOwnerAddress()).toEqual(
    "0x8219094017Ff969dCd39957b09DB8a76BbD685e9"
  );
});

test("gets owner balance from node", async () => {
  const res = await Service.getBalance();
  expect(res.length).toBeGreaterThan(0);
  expect(parseInt(res)).toBeGreaterThan(1);
});

test("creates jur status type", async () => {
  const res = await Service.createJurStatusType(new Date().toString());
  expect(res).toEqual(
    expect.objectContaining({
      transactionHash: expect.any(String)
    })
  );
}, 30000);
