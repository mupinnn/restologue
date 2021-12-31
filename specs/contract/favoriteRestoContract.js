const itActAsFavoriteRestoModel = (favoriteResto) => {
  it("should return the resto that has been added", async () => {
    favoriteResto.putResto({ id: 1 });

    expect(favoriteResto.getResto(1)).toEqual({ id: 1 });
    expect(favoriteResto.getResto(2)).toEqual({ id: 2 });
    expect(favoriteResto.getResto(3)).toEqual(undefined);
  });
};

export { itActAsFavoriteRestoModel };
