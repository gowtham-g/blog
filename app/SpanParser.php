<?php
/**
 * Created by PhpStorm.
 * User: user-15
 * Date: 9/24/2018
 * Time: 3:47 PM
 */
use League\CommonMark\Inline\Parser\AbstractInlineParser;

class SpanParser extends AbstractInlineParser
{
    public function getCharacters()
    {
        return [':'];
    }

    public function parse(InlineParserContext $inlineContext)
    {
        dd($inlineContext);
        $cursor = $inlineContext->getCursor();

        // The next character must be a paren; if not, then bail
        // We use peek() to quickly check without affecting the cursor
        $nextChar = $cursor->peek();
        if ($nextChar !== '(' && $nextChar !== ')') {
            return false;
        }

        // Advance the cursor past the 2 matched chars since we're able to parse them successfully
        $cursor->advanceBy(2);

        // Add the corresponding image
        if ($nextChar === ')') {
            $inlineContext->getContainer()->appendChild(new Image('/img/happy.png'));
        } elseif ($nextChar === '(') {
            $inlineContext->getContainer()->appendChild(new Image('/img/sad.png'));
        }

        return true;
    }
}

$environment = Environment::createCommonMarkEnvironment();
$environment->addInlineParser(new SmilieParserParser());