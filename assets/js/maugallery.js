!(function (a) {
  (a.fn.mauGallery = function (t) {
    var t = a.extend(a.fn.mauGallery.defaults, t),
      e = [];
    return this.each(function () {
      a.fn.mauGallery.methods.createRowWrapper(a(this)),
        t.lightBox &&
          a.fn.mauGallery.methods.createLightBox(
            a(this),
            t.lightboxId,
            t.navigation
          ),
        a.fn.mauGallery.listeners(t),
        a(this)
          .children(".gallery-item")
          .each(function (l) {
            a.fn.mauGallery.methods.responsiveImageItem(a(this)),
              a.fn.mauGallery.methods.moveItemInRowWrapper(a(this)),
              a.fn.mauGallery.methods.wrapItemInColumn(a(this), t.columns);
            var i = a(this).data("gallery-tag");
            t.showTags && void 0 !== i && -1 === e.indexOf(i) && e.push(i);
          }),
        t.showTags &&
          a.fn.mauGallery.methods.showItemTags(a(this), t.tagsPosition, e),
        a(this).fadeIn(500);
    });
  }),
    (a.fn.mauGallery.defaults = {
      columns: 3,
      lightBox: !0,
      lightboxId: null,
      showTags: !0,
      tagsPosition: "bottom",
      navigation: !0,
    }),
    (a.fn.mauGallery.listeners = function (t) {
      a(".gallery-item").on("click", function () {
        t.lightBox &&
          "IMG" === a(this).prop("tagName") &&
          a.fn.mauGallery.methods.openLightBox(a(this), t.lightboxId);
      }),
        a(".gallery").on(
          "click",
          ".nav-link",
          a.fn.mauGallery.methods.filterByTag
        ),
        a(".gallery").on("click", ".mg-prev", () =>
          a.fn.mauGallery.methods.prevImage(t.lightboxId)
        ),
        a(".gallery").on("click", ".mg-next", () =>
          a.fn.mauGallery.methods.nextImage(t.lightboxId)
        );
    }),
    (a.fn.mauGallery.methods = {
      createRowWrapper(a) {
        a.children().first().hasClass("row") ||
          a.append('<div class="gallery-items-row row"></div>');
      },
      wrapItemInColumn(a, t) {
        if (t.constructor === Number)
          a.wrap(
            `<div class='item-column mb-4 col-${Math.ceil(12 / t)}'></div>`
          );
        else if (t.constructor === Object) {
          var e = "";
          t.xs && (e += ` col-${Math.ceil(12 / t.xs)}`),
            t.sm && (e += ` col-sm-${Math.ceil(12 / t.sm)}`),
            t.md && (e += ` col-md-${Math.ceil(12 / t.md)}`),
            t.lg && (e += ` col-lg-${Math.ceil(12 / t.lg)}`),
            t.xl && (e += ` col-xl-${Math.ceil(12 / t.xl)}`),
            a.wrap(`<div class='item-column mb-4${e}'></div>`);
        } else
          console.error(
            `Columns should be defined as numbers or objects. ${typeof t} is not supported.`
          );
      },
      moveItemInRowWrapper(a) {
        a.appendTo(".gallery-items-row");
      },
      responsiveImageItem(a) {
        "IMG" === a.prop("tagName") && a.addClass("img-fluid");
      },
      openLightBox(t, e) {
        a(`#${e}`).find(".lightboxImage").attr("src", t.attr("src")),
          a(`#${e}`).modal("toggle");
      },
      prevImage(t) {
        const currentImg = a(`#${t}`).find(".lightboxImage");
        const currentSrc = currentImg.attr("src");
        const images = a(".gallery-item").toArray();
        const activeTag = a(".tags-bar span.active-tag").data("images-toggle");

        const filteredImages = images.filter((img) => {
          const imgEl = a(img);
          return activeTag === "all" || imgEl.data("gallery-tag") === activeTag;
        });

        const currentIndex = filteredImages.findIndex(
          (img) => a(img).attr("src") === currentSrc
        );
        const prevIndex =
          currentIndex <= 0 ? filteredImages.length - 1 : currentIndex - 1;

        currentImg.attr("src", a(filteredImages[prevIndex]).attr("src"));
      },
      nextImage(t) {
        const currentImg = a(`#${t}`).find(".lightboxImage");
        const currentSrc = currentImg.attr("src");
        const images = a(".gallery-item").toArray();
        const activeTag = a(".tags-bar span.active-tag").data("images-toggle");

        const filteredImages = images.filter((img) => {
          const imgEl = a(img);
          return activeTag === "all" || imgEl.data("gallery-tag") === activeTag;
        });

        const currentIndex = filteredImages.findIndex(
          (img) => a(img).attr("src") === currentSrc
        );
        const nextIndex = (currentIndex + 1) % filteredImages.length;

        currentImg.attr("src", a(filteredImages[nextIndex]).attr("src"));
      },
      createLightBox(a, t, e) {
        a.append(`<div class="modal fade" id="${
          t || "galleryLightbox"
        }" tabindex="-1" role="dialog" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-body">
                            ${
                              e
                                ? '<div class="mg-prev"><</div>'
                                : '<span class="gallery-nav-span"/>'
                            }
                            <img class="lightboxImage img-fluid" alt="Contenu de l'image affich\xe9e dans la modale au clique"/>
                            ${
                              e
                                ? '<div class="mg-next">></div>'
                                : '<span class="gallery-nav-span" />'
                            }
                        </div>
                    </div>
                </div>
            </div>`);
      },
      showItemTags(t, e, l) {
        var i =
          '<li class="nav-item"><span class="nav-link active active-tag"  data-images-toggle="all">Tous</span></li>';
        a.each(l, function (a, t) {
          i += `<li class="nav-item active">
                <span class="nav-link"  data-images-toggle="${t}">${t}</span></li>`;
        });
        var s = `<ul class="my-4 tags-bar nav nav-pills">${i}</ul>`;
        "bottom" === e
          ? t.append(s)
          : "top" === e
          ? t.prepend(s)
          : console.error(`Unknown tags position: ${e}`);
      },
      filterByTag() {
        if (!a(this).hasClass("active-tag")) {
          // Supprimer les classes active et active-tag de l'ancien filtre
          a(".active-tag").removeClass("active active-tag");
          // Ajouter les deux classes au nouveau filtre
          a(this).addClass("active active-tag");

          var t = a(this).data("images-toggle");
          a(".gallery-item").each(function () {
            a(this).parents(".item-column").hide();
            if (t === "all") {
              a(this).parents(".item-column").show(300);
            } else if (a(this).data("gallery-tag") === t) {
              a(this).parents(".item-column").show(300);
            }
          });
        }
      },
    });
})(jQuery);
