import { LatamOnboarding } from "../../../src/customer/onboarding/latam_onboarding";

test("should verify if all data is completed", () => {
  const latamOnboarding1 = new LatamOnboarding({
    birthDate: new Date(2000, 1, 1),
    tin: "111222",
    suitabilityAnswer: { answers: [{ id: 1, order: 1, points: 15 }] },
    personalDocuments: {
      documents: [
        {
          side: "FRONT",
          type: "RG",
          url: "https://starwalk.space/gallery/images/what-is-space/1920x1080.jpg",
        },
        {
          side: "BACK",
          type: "RG",
          url: "https://starwalk.space/gallery/images/what-is-space/1920x1080.jpg",
        },
        {
          side: "FRONT",
          type: "PROOF_OF_ADDRESS",
          url: "https://starwalk.space/gallery/images/what-is-space/1920x1080.jpg",
        },
      ],
    },
    document: {
      country: { code: "CO", name: "Colombia" },
      number: "111111",
      type: "RG",
    },
  });

  expect(latamOnboarding1.isFilledAllMandatoryData).toBe(true);

  // const latamOnboarding2 = new LatamOnboarding({
  //   birthDate: new Date(2000, 1, 1),
  //   document: {
  //     country: { code: "CO", name: "Colombia" },
  //     number: "111111",
  //     type: "RG",
  //   },
  // });

  // expect(latamOnboarding2.isFilledAllMandatoryData).toBe(false);
});

test("deve retornar os campos faltantes", () => {
  const latamOnboarding1 = new LatamOnboarding({
    birthDate: new Date(2000, 1, 1),
    document: {
      country: { code: "CO", name: "Colombia" },
      number: "111111",
      type: "RG",
    },
  });

  expect(latamOnboarding1.fieldsWillBeFilled).toStrictEqual([
    "tin",
    "suitability",
    "personalDocuments",
  ]);

  const latamOnboarding2 = new LatamOnboarding({
    birthDate: new Date(2000, 1, 1),
    document: {
      country: { code: "CO", name: "Colombia" },
      type: "RG",
    },
  });

  expect(latamOnboarding2.fieldsWillBeFilled).toStrictEqual([
    "tin",
    "document.number",
    "suitability",
    "personalDocuments",
  ]);
});
