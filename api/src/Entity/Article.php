<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Annotation\ApiProperty;
use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * Blog Article.
 *
 * @ApiResource(
 *     iri="http://schema.org/Article",
 *     attributes={
 *      "normalization_context"={"groups"={"article"}},
 *      "denormalization_context"={"groups"={"write"}},
 *      "filters"={"article.boolean_filter"}
 *     }
 * )
 *
 * @ApiFilter(SearchFilter::class, strategy="partial")
 * @ORM\Entity
 */
class Article
{
    /**
     * @var int The entity Id
     *
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @var string A nice name
     *
     * @ApiProperty(
     *     iri="http://schema.org/name"
     * )
     * @Groups({"article", "write"})
     *
     * @ORM\Column
     * @Assert\NotBlank
     */
    public $name = '';

    /**
     * @var string A comprehensive description
     *
     * @ApiProperty(
     *     iri="http://schema.org/description"
     * )
     *
     * @Groups({"article", "write"})
     *
     * @ORM\Column(type="text")
     * @Assert\NotBlank
     */
    public $description;

    /**
     * @var string An entertaining content
     *
     * @ApiProperty(
     *     iri="http://schema.org/articleBody"
     * )
     *
     * @Groups({"article", "write"})
     *
     * @ORM\Column(type="text")
     * @Assert\NotBlank
     */
    public $articleBody;

    /**
     * @var Author
     *
     * @Groups({"article", "write"})
     *
     * @ORM\ManyToOne(targetEntity="App\Entity\Author")
     */
    public $author;

    /**
     * @var bool Is it ready yet ?
     *
     * @Groups({"write"})
     *
     * @ORM\Column(type="boolean")
     * @Assert\NotNull
     */
    public $enabled;

    /**
     * @return int
     */
    public function getId(): int
    {
        return $this->id;
    }

    /**
     * @param int $id
     */
    public function setId(int $id): void
    {
        $this->id = $id;
    }

    /**
     * @return string
     */
    public function getName(): string
    {
        return $this->name;
    }

    /**
     * @param string $name
     */
    public function setName(string $name): void
    {
        $this->name = $name;
    }

    /**
     * @return string
     */
    public function getDescription(): string
    {
        return $this->description;
    }

    /**
     * @param string $description
     */
    public function setDescription(string $description): void
    {
        $this->description = $description;
    }

    /**
     * @return string
     */
    public function getArticleBody(): string
    {
        return $this->articleBody;
    }

    /**
     * @param string $articleBody
     */
    public function setArticleBody(string $articleBody): void
    {
        $this->articleBody = $articleBody;
    }

    /**
     * @return bool
     */
    public function isEnabled(): bool
    {
        return $this->enabled;
    }

    /**
     * @param bool $enabled
     */
    public function setEnabled(bool $enabled): void
    {
        $this->enabled = $enabled;
    }

    /**
     * @return Author
     */
    public function getAuthor():? Author
    {
        return $this->author;
    }

    /**
     * @param Author $author
     */
    public function setAuthor(?Author $author): void
    {
        $this->author = $author;
    }
}
